import { infiniteQueryOptions } from "@tanstack/react-query";
import { PaginatedPostsSchema } from "src/api/types/PaginatedPosts";
import { API } from "src/context/AuthContext";

export function infinitePostsQueryOptions(api: API, pageSize: number) {
  return infiniteQueryOptions({
    queryKey: ["posts", "infinite", pageSize],
    queryFn: async ({ pageParam }) => {
      const data = await api(`/posts?page=${pageParam}&pageSize=${pageSize}`).then((res) => res.json());
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
