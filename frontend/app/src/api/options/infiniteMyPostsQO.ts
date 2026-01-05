import { infiniteQueryOptions } from "@tanstack/react-query";
import { PaginatedPostsSchema } from "src/api/types/PaginatedPosts";
import { API } from "src/context/AuthContext";
import { PostType } from "../types/Post";

type AdditionalQueryOptions = {
  postType?: PostType;
  resolved?: boolean;
};

export function infiniteMyPostsQO(
  api: API,
  pageSize: number,
  { postType, resolved }: AdditionalQueryOptions = {}
) {
  return infiniteQueryOptions({
    queryKey: ["posts", "infinite", "my", pageSize, postType, resolved],
    queryFn: async ({ pageParam }) => {
      const queryParams = new URLSearchParams();
      queryParams.append("page", pageParam.toString());
      queryParams.append("pageSize", pageSize.toString());
      if (postType) {
        queryParams.append("postType", postType);
      }
      if (resolved !== undefined) {
        queryParams.append("resolved", resolved.toString());
      }
      const data = await api(`/posts/my?${queryParams.toString()}`).then((res) => res.json());
      return PaginatedPostsSchema.parse(data);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.page.number + 1 >= lastPage.page.totalPages) {
        return undefined;
      }
      return allPages.length;
    },
  });
}

export function infiniteMyPostsFullKey() {
  return ["posts", "infinite", "my"];
}
