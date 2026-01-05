import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, View, RefreshControl, Button } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { infiniteMyPostsFullKey, infiniteMyPostsQO } from "src/api/options/infiniteMyPostsQO";
import { PostType } from "src/api/types/Posts";
import MyPostCard from "src/components/MyPosts/MyPostCard";
import { ActivityIndicator, CenteredView, PageHeader, Text } from "src/components/ui";
import { useAuthContext } from "src/context/AuthContext";
import { ProfileStackParamList } from "src/navigation/ProfileStackNavigator";
import MyPostsFilters from "../../components/MyPosts/MyPostsFilters";

type NavigationProps = NativeStackNavigationProp<ProfileStackParamList, "MyPostsScreen">;

export default function MyPostsScreen() {
  const { navigate } = useNavigation<NavigationProps>();
  const queryClient = useQueryClient();

  const [postType, setPostType] = useState<PostType | undefined>(undefined);
  const [resolved, setResolved] = useState<boolean | undefined>(undefined);

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
  } = useInfiniteQuery(infiniteMyPostsQO(api, 12, { postType, resolved }));

  if (isError) {
    console.error("Error fetching feed posts:", error);
    return (
      <CenteredView>
        <Text>Error loading your posts</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </CenteredView>
    );
  }

  const posts = data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <View style={styles.container}>
      {isLoading || isRefetching ? (
        <ActivityIndicator />
      ) : (
        <>
          <FlatList
            data={posts}
            style={styles.listStyle}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MyPostCard post={item} onNavigate={() => navigate("MyFullPostScreen", { postId: item.id })} />
            )}
            onEndReached={() => {
              if (hasNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={
              <PageHeader>
                <Text style={styles.headerText}>My Posts</Text>
                <MyPostsFilters
                  postType={postType}
                  resolved={resolved}
                  setPostType={setPostType}
                  setResolved={setResolved}
                />
              </PageHeader>
            }
            ListFooterComponent={
              isFetchingNextPage ? <ActivityIndicator style={styles.bottomActivityIndicator} /> : null
            }
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={() => {
                  queryClient.removeQueries({ queryKey: infiniteMyPostsFullKey() });
                  refetch();
                }}
              />
            }
          />

          {posts.length === 0 && (
            <CenteredView direction="row">
              <Text style={{ fontStyle: "italic" }}>No posts found</Text>
            </CenteredView>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surfaceA0,
    paddingTop: 12,
  },
  listStyle: {
    flexGrow: 0,
    flexShrink: 1,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 700,
    color: theme.colors.primaryA0,
  },
  bottomActivityIndicator: {
    margin: 16,
  },
}));
