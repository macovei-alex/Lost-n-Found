import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FlatList, View, RefreshControl } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { infinitePostsQO } from "src/api/options/infinitePostsQO";
import FeedListHeader from "src/components/FeedScreen/FeedHeader";
import PostCard from "src/components/FeedScreen/PostCard";
import { ActivityIndicator, CenteredView, Text, Button } from "src/components/ui";
import { useAuthContext } from "src/context/AuthContext";
import { PostsStackParamList } from "src/navigation/PostsStackNavigator";

type NavigationProps = NativeStackNavigationProp<PostsStackParamList, "FeedScreen">;

export default function FeedScreen() {
  const { navigate } = useNavigation<NavigationProps>();
  const { api } = useAuthContext();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    isRefetching,
    error,
  } = useInfiniteQuery(infinitePostsQO(api, 12));

  if (isLoading || isRefetching) {
    return <ActivityIndicator />;
  }

  if (isError || !data) {
    console.error("Error fetching feed posts:", error);
    return (
      <CenteredView style={styles.alternativeContainer}>
        <Text>Error loading feed posts</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </CenteredView>
    );
  }

  const posts = data.pages.flatMap((page) => page.content) ?? [];

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard post={item} onNavigate={() => navigate("FullPostScreen", { postId: item.id })} />
        )}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={<FeedListHeader />}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator style={styles.bottomActivityIndicator} /> : null
        }
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surfaceA0,
  },
  alternativeContainer: {
    backgroundColor: theme.colors.surfaceA0,
    gap: 8,
  },
  errorText: {
    color: theme.colors.text,
  },
  bottomActivityIndicator: {
    margin: 16,
  },
}));
