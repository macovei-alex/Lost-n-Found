import React, { useMemo, useState } from "react";
import { Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Text } from "src/components/ui";
import { Post } from "src/api/types/Post";
import { useAuthContext } from "src/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { NativeBottomTabNavigationProp } from "@react-navigation/bottom-tabs/unstable";
import { MainTabParamList } from "src/navigation/MainTabNavigator";
import * as ImagePicker from "expo-image-picker";
import PostTypeSelector from "src/components/CreatePost/PostTypeSelector";
import FormTextFields, { TextFieldConfig } from "src/components/CreatePost/FormTextFields";
import MainImageSection from "src/components/CreatePost/MainImageSection";
import OtherImagesSection from "src/components/CreatePost/OtherImagesSection";
import SubmitSection from "src/components/CreatePost/SubmitSection";

type NavigationProps = NativeBottomTabNavigationProp<MainTabParamList, "CreatePostScreen">;

type SelectedImage = {
  uri: string;
  name: string;
  mimeType?: string;
};

type FormState = {
  postType: Post["postType"];
  title: string;
  itemDescription: string;
  location: string;
  mainImage: SelectedImage | null;
  productLink: string;
  otherImages: SelectedImage[];
};

const initialState: FormState = {
  postType: "LOST",
  title: "",
  itemDescription: "",
  location: "",
  mainImage: null,
  productLink: "",
  otherImages: [],
};

const TEXT_FIELDS: TextFieldConfig[] = [
  {
    key: "title",
    label: "Title",
    placeholder: "Lost backpack near library",
    autoCapitalize: "sentences",
  },
  {
    key: "itemDescription",
    label: "Description",
    placeholder: "Color, unique marks, when you lost/found it...",
    multiline: true,
    numberOfLines: 4,
  },
  {
    key: "location",
    label: "Location",
    placeholder: "Campus library, Cafeteria, etc.",
    autoCapitalize: "sentences",
  },
  {
    key: "productLink",
    label: "Product Link (optional)",
    placeholder: "https://...",
    autoCapitalize: "none",
    keyboardType: "url",
  },
];

export default function CreatePostScreen() {
  const navigation = useNavigation<NavigationProps>();
  const queryClient = useQueryClient();
  const { api } = useAuthContext();

  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = useMemo(() => {
    return (
      form.title.trim().length > 0 &&
      form.itemDescription.trim().length > 0 &&
      form.location.trim().length > 0 &&
      !!form.mainImage &&
      form.otherImages.length <= 5
    );
  }, [form]);

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K] | ((prev: FormState[K]) => FormState[K])
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: typeof value === "function" ? (value as (prev: FormState[K]) => FormState[K])(prev[key]) : value,
    }));
  };

  const pickImages = async (mode: "main" | "other") => {
    const remainingSlots = mode === "other" ? Math.max(0, 5 - form.otherImages.length) : 1;
    if (remainingSlots === 0) {
      Alert.alert("Limit reached", "You can add up to 5 additional images.");
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Allow photo library access to pick images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: mode === "other",
      selectionLimit: remainingSlots,
      defaultTab: "photos",
      quality: 1,
    });

    if (result.canceled) return;

    const normalized: SelectedImage[] = result.assets.map((asset) => {
      const derivedName = asset.fileName || asset.uri.split("/").pop() || `image-${Date.now()}`;
      return {
        uri: asset.uri,
        name: derivedName,
        mimeType: asset.mimeType,
      };
    });

    if (mode === "main") {
      const first = normalized[0];
      updateField("mainImage", first);
    } else {
      const next = [...form.otherImages, ...normalized].slice(0, 5);
      updateField("otherImages", next);
    }
  };

  const removeOtherImage = (name: string) => {
    updateField("otherImages", (prev) => prev.filter((img) => img.name !== name));
  };

  const buildFormData = (form: FormState): FormData => {
    const data = new FormData();

    data.append("postType", form.postType);
    data.append("title", form.title.trim());
    data.append("itemDescription", form.itemDescription.trim());
    data.append("location", form.location.trim());
    data.append("productLink", form.productLink.trim());

    if (form.mainImage) {
      data.append("mainImage", {
        uri: form.mainImage.uri.trim(),
        name: form.mainImage.name.trim(),
        type: form.mainImage.mimeType ?? "image/jpeg",
      } as any);
    }

    form.otherImages.forEach((image) => {
      data.append("otherImages", {
        uri: image.uri.trim(),
        name: image.name.trim(),
        type: image.mimeType ?? "image/jpeg",
      } as any);
    });

    return data;
  };

  const handleSubmit = async () => {
    if (!isValid) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const formData = buildFormData(form);

      await api("/posts", {
        method: "POST",
        body: formData,
      });

      await queryClient.invalidateQueries({ queryKey: ["posts"] });

      Alert.alert("Post created", "Your post has been published.");
      setForm(initialState);
      navigation.navigate("PostsStackNavigator");
    } catch (err) {
      console.error("Failed to create post", err);
      setError("Unable to create post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={24}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Create a Post</Text>

        <PostTypeSelector selected={form.postType} onSelect={(type) => updateField("postType", type)} />

        <FormTextFields
          fields={TEXT_FIELDS}
          values={form}
          onChangeField={(key, value) =>
            updateField(key as keyof FormState, value as FormState[keyof FormState])
          }
        />

        <MainImageSection
          selectedImageName={form.mainImage?.name ?? null}
          onPickImage={() => pickImages("main")}
        />

        <OtherImagesSection
          images={form.otherImages}
          onRemoveImage={removeOtherImage}
          onAddImages={() => pickImages("other")}
        />

        <SubmitSection
          error={error}
          isValid={isValid}
          isSubmitting={submitting}
          onCancel={() => navigation.goBack()}
          onSubmit={handleSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    minHeight: "100%",
    padding: 20,
    paddingTop: 36,
    backgroundColor: theme.colors.surfaceA0,
    gap: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.primaryA10,
    marginBottom: 8,
  },
}));
