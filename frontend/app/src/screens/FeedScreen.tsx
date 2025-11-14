import { useInfiniteQuery } from "@tanstack/react-query";
import { FlatList, ActivityIndicator, Text, View, RefreshControl, Button } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { infinitePostsQueryOptions } from "src/api/options/infinitePostsQueryOptions";
import FeedListHeader from "src/components/FeedScreen/FeedHeader";
import PostCard from "src/components/FeedScreen/PostCard";

export default function FeedScreen() {
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
  } = useInfiniteQuery(infinitePostsQueryOptions(12));

  if (isLoading || isRefetching) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !data) {
    console.error("Error fetching feed posts: ", error);
    return (
      <View style={styles.centered}>
        <Text>Error loading feed posts</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  const posts = data.pages.flatMap((page) => page.content) ?? [];

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={<FeedListHeader />}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator style={styles.bottomActivityIndicator} /> : null
        }
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surfaceA0,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomActivityIndicator: {
    margin: 16,
  },
}));
