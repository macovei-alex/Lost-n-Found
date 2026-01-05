import { queryOptions } from "@tanstack/react-query";
import { API } from "src/context/AuthContext";
import { FullPostSchema } from "../types/Posts";

export function loadFullPostQO(api: API, postId: number) {
  return queryOptions({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const data = await api(`/posts/${postId}`).then((res) => res.json());
      return FullPostSchema.parse(data);
    },
  });
}
