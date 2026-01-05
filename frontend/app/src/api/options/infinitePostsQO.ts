import { infiniteQueryOptions } from "@tanstack/react-query";
import { API } from "src/context/AuthContext";
import { PaginatedPostsSchema } from "../types/Posts";

export function infinitePostsQO(api: API, pageSize: number) {
  return infiniteQueryOptions({
    queryKey: ["posts", "infinite", pageSize],
    queryFn: async ({ pageParam }) => {
      const response = await api(`/posts?page=${pageParam}&pageSize=${pageSize}`);
      const data = await response.json();
      return PaginatedPostsSchema.parse(data);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.page.number + 1 >= lastPage.page.totalPages) {
        return undefined;
      }
      return lastPage.page.number + 1;
    },
  });
}
