import React, { useMemo, useState } from "react";
import { Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { MiniMap, Text, TouchableOpacity } from "src/components/ui";
import { CreatePost } from "src/api/types/Posts";
import { useAuthContext } from "src/context/AuthContext";
import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeBottomTabNavigationProp } from "@react-navigation/bottom-tabs/unstable";
import { MainTabParamList } from "src/navigation/MainTabNavigator";
import * as ImagePicker from "expo-image-picker";
import PostTypeSelector from "src/components/CreatePost/PostTypeSelector";
import FormTextFields, { TextFieldConfig } from "src/components/CreatePost/FormTextFields";
import MainImageSection from "src/components/CreatePost/MainImageSection";
import OtherImagesSection from "src/components/CreatePost/OtherImagesSection";
import SubmitSection from "src/components/CreatePost/SubmitSection";
import { useCreatePostMutation } from "src/api/mutations/useCreatePostMutation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/navigation/RootStackNavigator";
import MapView from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { MapMarker } from "src/components/ui";

type NavigationProps = CompositeNavigationProp<
  NativeBottomTabNavigationProp<MainTabParamList, "CreatePostScreen">,
  NativeStackNavigationProp<RootStackParamList>
>;

type RouteProps = RouteProp<MainTabParamList, "CreatePostScreen">;

type SelectedImage = {
  uri: string;
  name: string;
  mimeType?: string;
};

const initialState: CreatePost = {
  postType: "LOST",
  title: "",
  itemDescription: "",
  mainImage: null,
  productLink: "",
  location: "",
  coordinates: null,
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
    key: "productLink",
    label: "Product Link (optional)",
    placeholder: "https://...",
    autoCapitalize: "none",
    keyboardType: "url",
  },
  {
    key: "location",
    label: "Location Alias",
    placeholder: "Campus library, Cafeteria, etc.",
    autoCapitalize: "sentences",
  },
];

export default function CreatePostScreen() {
  const navigation = useNavigation<NavigationProps>();
  const params = useRoute<RouteProps>().params;
  const { api } = useAuthContext();

  const createPostMutation = useCreatePostMutation(api);

  const [createPostData, setCreatePostData] = useState<CreatePost>(initialState);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(() => {
    if (
      !!params?.coordinates &&
      (params.coordinates.latitude !== createPostData.coordinates?.latitude ||
        params.coordinates.longitude !== createPostData.coordinates?.longitude)
    ) {
      setCreatePostData((prev) => ({
        ...prev,
        coordinates: params.coordinates,
      }));
    }
  });

  const isValid = useMemo(() => {
    return (
      createPostData.title.trim().length > 0 &&
      createPostData.itemDescription.trim().length > 0 &&
      createPostData.location.trim().length > 0 &&
      !!createPostData.coordinates &&
      !!createPostData.mainImage &&
      createPostData.otherImages.length <= 5
    );
  }, [createPostData]);

  const updateField = <K extends keyof CreatePost>(
    key: K,
    value: CreatePost[K] | ((prev: CreatePost[K]) => CreatePost[K]),
  ) => {
    setCreatePostData((prev) => ({
      ...prev,
      [key]:
        typeof value === "function" ? (value as (prev: CreatePost[K]) => CreatePost[K])(prev[key]) : value,
    }));
  };

  const pickImages = async (mode: "main" | "other") => {
    const remainingSlots = mode === "other" ? Math.max(0, 5 - createPostData.otherImages.length) : 1;
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
      const next = [...createPostData.otherImages, ...normalized].slice(0, 5);
      updateField("otherImages", next);
    }
  };

  const removeOtherImage = (name: string) => {
    updateField("otherImages", (prev) => prev.filter((img) => img.name !== name));
  };

  const handleSubmit = async () => {
    if (!isValid) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(null);
    createPostMutation.mutate(createPostData, {
      onSuccess: () => {
        Alert.alert("Post created", "Your post has been published.");
        setCreatePostData(initialState);
        navigation.navigate("PostsStackNavigator");
      },
      onError: (err) => {
        console.error("Error creating post:", err);
        Alert.alert("Error", "There was an error creating your post. Please try again.");
      },
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={24}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Create a Post</Text>

        <PostTypeSelector
          selected={createPostData.postType}
          onSelect={(type) => updateField("postType", type)}
        />

        <FormTextFields
          fields={TEXT_FIELDS}
          values={createPostData}
          onChangeField={(key, value) =>
            updateField(key as keyof CreatePost, value as CreatePost[keyof CreatePost])
          }
        />

        {createPostData.coordinates && <MiniMap coordinates={createPostData.coordinates} />}

        <TouchableOpacity
          style={{ opacity: createPostData.coordinates ? 0.7 : 1 }}
          onPress={() => {
            navigation.navigate(
              "MapScreen",
              createPostData.coordinates ? { initialCoordinates: createPostData.coordinates } : undefined,
            );
          }}
        >
          <Text style={styles.coordinatesButtonText}>Pick the spot on the map</Text>
        </TouchableOpacity>

        <MainImageSection
          selectedImageName={createPostData.mainImage?.name ?? null}
          onPickImage={() => pickImages("main")}
        />

        <OtherImagesSection
          images={createPostData.otherImages}
          onRemoveImage={removeOtherImage}
          onAddImages={() => pickImages("other")}
        />

        <SubmitSection
          error={error}
          isValid={isValid}
          isSubmitting={createPostMutation.isPending}
          onCancel={() => navigation.goBack()}
          onSubmit={handleSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const UMapView = withUnistyles(MapView, (theme) => ({
  userInterfaceStyle: theme.name,
}));

const UFontAwesome = withUnistyles(FontAwesome, (theme) => ({
  color: theme.colors.primaryA0,
}));

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
  coordinatesButtonText: {
    color: theme.colors.textOpposite,
    fontWeight: "600",
  },
}));
