import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Alert, RefreshControl, ScrollView, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useResolvePostMutation } from "src/api/mutations/useResolvePostMutation";
import { loadFullPostQO } from "src/api/options/loadFullPostQO";
import { Button, CenteredView, ActivityIndicator, Text, TouchableOpacity, MiniMap } from "src/components/ui";
import { ENV } from "src/config/env";
import { useAuthContext } from "src/context/AuthContext";
import { ProfileStackParamList } from "src/navigation/ProfileStackNavigator";
import { RootStackParamList } from "src/navigation/RootStackNavigator";
import { formatDate } from "src/utils/date";

type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<ProfileStackParamList, "MyFullPostScreen">,
  NativeStackNavigationProp<RootStackParamList>
>;
type RouteProps = RouteProp<ProfileStackParamList, "MyFullPostScreen">;

export default function MyFullPostScreen() {
  const { postId } = useRoute<RouteProps>().params;
  const { navigate, canGoBack, goBack } = useNavigation<NavigationProps>();
  const { api } = useAuthContext();

  const postQuery = useQuery(loadFullPostQO(api, postId));
  const resolvePostMutation = useResolvePostMutation(api);

  const resolvePost = () => {
    Alert.alert("Resolve Post", "Are you sure you want to mark this post as resolved?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Resolve",
        onPress: () => resolvePostMutation.mutate(postId),
      },
    ]);
  };

  if (postQuery.isLoading || postQuery.isRefetching) {
    return (
      <CenteredView style={styles.alternativeContainer}>
        <ActivityIndicator />
      </CenteredView>
    );
  }

  if (!postQuery.data || postQuery.isError) {
    console.error(`Error fetching post: ${postId}`, postQuery.error);
    return (
      <CenteredView style={styles.alternativeContainer}>
        <Text>Error loading post</Text>
        <Button title="Retry" onPress={() => postQuery.refetch()} />
        {canGoBack() && <Button title="Go Back" onPress={goBack} />}
      </CenteredView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={postQuery.isRefetching} onRefresh={postQuery.refetch} />}
    >
      {/* Main Image */}
      <Image
        source={{ uri: `${ENV.API_BASE_URL}/images/${postQuery.data.mainImageName}` }}
        style={styles.mainImage}
        contentFit="contain"
      />

      {/* Post Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>{postQuery.data.title}</Text>
        {postQuery.data.productLink && (
          <TouchableOpacity
            onPress={() => {
              if (!postQuery.data.productLink) return;
              navigate("WebViewScreen", { uri: postQuery.data.productLink });
            }}
            style={styles.linkContainer}
          >
            <Text style={styles.link}>View Product</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Description */}
      <Text style={styles.description}>{postQuery.data.itemDescription}</Text>

      {/* Post Type */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{postQuery.data.postType}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{postQuery.data.location}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Posted On:</Text>
        <Text style={styles.value}>{formatDate(postQuery.data.createdAt)}</Text>
      </View>

      <MiniMap coordinates={postQuery.data.coordinates} />

      {postQuery.data.resolvedAt && (
        <View style={styles.infoRow}>
          <Text style={styles.label}>Resolved On:</Text>
          <Text style={styles.value}>{formatDate(postQuery.data.resolvedAt)}</Text>
        </View>
      )}

      {/* Additional Images */}
      {postQuery.data.otherImages.length > 0 && (
        <View style={styles.imagesContainer}>
          {postQuery.data.otherImages.map((img) => (
            <Image
              key={img.id}
              source={{ uri: `${ENV.API_BASE_URL}/images/${img.name}` }}
              style={styles.additionalImage}
              contentFit="cover"
            />
          ))}
        </View>
      )}

      {!postQuery.data.resolvedAt && (
        <Button title="Resolve post" onPress={resolvePost} disabled={resolvePostMutation.isPending} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    backgroundColor: theme.colors.surfaceA10,
    minHeight: "100%",
  },
  alternativeContainer: {
    gap: 2,
    backgroundColor: theme.colors.surfaceA10,
  },
  mainImage: {
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  titleSection: {
    flexDirection: "row",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.primaryA10,
  },
  linkContainer: {
    backgroundColor: theme.colors.surfaceA20,
  },
  link: {
    textDecorationLine: "underline",
    color: theme.colors.primaryA10,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  label: {
    fontWeight: "bold",
    marginRight: 4,
    color: theme.colors.primaryA50,
  },
  value: {
    color: theme.colors.primaryA30,
  },
  description: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 16,
    color: theme.colors.primaryA30,
  },
  imagesContainer: {
    marginTop: 8,
  },
  typeChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.primaryA20,
    backgroundColor: theme.colors.surfaceA20,
  },
  typeChipText: {
    fontWeight: "700",
    fontSize: 13,
    color: theme.colors.primaryA10,
    letterSpacing: 0.3,
  },
  additionalImage: {
    width: "100%",
    height: 200,
    marginBottom: 12,
    borderRadius: 12,
  },
}));
