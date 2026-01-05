import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "src/context/AuthContext";
import { FullPostSchema, Post } from "../types/Posts";
import { loadFullPostQO } from "../options/loadFullPostQO";
import { infiniteMyPostsFullKey } from "../options/infiniteMyPostsQO";

export function useResolvePostMutation(api: API) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: Post["id"]) => {
      const response = await api(`/posts/${postId}/resolve`, { method: "PUT" });
      if (!response.ok) {
        throw new Error("Failed to resolve post");
      }
      const data = await response.json();
      return FullPostSchema.parse(data);
    },
    onSuccess: async (post) => {
      const fullPostQO = loadFullPostQO(api, post.id);
      await queryClient.cancelQueries(fullPostQO);
      queryClient.setQueryData(fullPostQO.queryKey, post);

      // queryClient.invalidateQueries(fullPostQO);
      queryClient.invalidateQueries({ queryKey: infiniteMyPostsFullKey() });
    },
  });
}
