import { infiniteQueryOptions } from "@tanstack/react-query";
import { ENV } from "src/config/env";
import { PaginatedPostsSchema } from "../types/PaginatedPosts";

export function infinitePostsQueryOptions(pageSize: number) {
  return infiniteQueryOptions({
    queryKey: ["posts", "infinite", pageSize],
    queryFn: async ({ pageParam }) => {
      const data = await fetch(`${ENV.API_BASE_URL}/posts?page=${pageParam}&pageSize=${pageSize}`).then(
        (res) => res.json()
      );
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
