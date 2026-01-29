import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { RefreshControl, ScrollView, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { loadFullPostQO } from "src/api/options/loadFullPostQO";
import MiniMap from "src/components/FullPostScreen/MiniMap";
import { Button, CenteredView, ActivityIndicator, Text, TouchableOpacity } from "src/components/ui";
import { ENV } from "src/config/env";
import { useAuthContext } from "src/context/AuthContext";
import { PostsStackParamList } from "src/navigation/PostsStackNavigator";
import { RootStackParamList } from "src/navigation/RootStackNavigator";
import { formatDate } from "src/utils/date";

type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<PostsStackParamList, "FullPostScreen">,
  NativeStackNavigationProp<RootStackParamList>
>;
type RouteProps = RouteProp<PostsStackParamList, "FullPostScreen">;

export default function FullPostScreen() {
  const { postId } = useRoute<RouteProps>().params;
  const { navigate, canGoBack, goBack } = useNavigation<NavigationProps>();
  const { api } = useAuthContext();
  const { data, error, isError, refetch, isLoading, isRefetching } = useQuery(loadFullPostQO(api, postId));

  if (isLoading || isRefetching) {
    return <ActivityIndicator />;
  }

  if (!data || isError) {
    console.error(`Error fetching post: ${postId}`, error);
    return (
      <CenteredView style={{ gap: 2 }}>
        <Text>Error loading post</Text>
        <Button title="Retry" onPress={() => refetch()} />
        {canGoBack() && <Button title="Go Back" onPress={goBack} />}
      </CenteredView>
    );
  }

  const handleLinkPress = () => {
    if (!data.productLink) return;
    navigate("WebViewScreen", { uri: data.productLink });
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      showsVerticalScrollIndicator={false}
    >
      {/* Main Image */}
      <Image
        source={{ uri: `${ENV.API_BASE_URL}/images/${data.mainImageName}` }}
        style={styles.mainImage}
        contentFit="contain"
      />

      {/* Post Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>{data.title}</Text>
        {data.productLink && (
          <TouchableOpacity onPress={handleLinkPress} style={styles.linkContainer}>
            <Text style={styles.link}>View Product</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Description */}
      <Text style={styles.description}>{data.itemDescription}</Text>

      {/* Post Info */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{data.postType}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Posted On:</Text>
        <Text style={styles.value}>{formatDate(data.createdAt)}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{data.location}</Text>
      </View>
      <View style={styles.minimapContainer}>
        <MiniMap coordinates={data.coordinates} />
      </View>
      {data.resolvedAt && (
        <View style={styles.infoRow}>
          <Text style={styles.label}>Resolved On:</Text>
          <Text style={styles.value}>{formatDate(data.resolvedAt)}</Text>
        </View>
      )}

      {/* Additional Images */}
      {data.otherImages.length > 0 && (
        <>
          <View style={styles.infoRow}>
            <Text style={styles.label}>More images:</Text>
          </View>
          <View style={styles.imagesContainer}>
            {data.otherImages.map((img) => (
              <Image
                key={img.id}
                source={{ uri: `${ENV.API_BASE_URL}/images/${img.name}` }}
                style={styles.additionalImage}
                contentFit="cover"
              />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  scrollView: {
    backgroundColor: theme.colors.surfaceA10,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: theme.colors.surfaceA10,
    minHeight: "100%",
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
    alignItems: "center",
    marginBottom: 12,
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
  minimapContainer: {
    marginBottom: 12,
  },
  additionalImage: {
    width: "100%",
    height: 200,
    marginBottom: 12,
    borderRadius: 12,
  },
}));
