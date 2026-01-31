import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePost } from "../types/Posts";
import { API } from "src/context/AuthContext";
import { infiniteMyPostsFullKey } from "../options/infiniteMyPostsQO";

export function useCreatePostMutation(api: API) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreatePost) => {
      const formData = buildFormData(payload);
      const response = await api("/posts", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: infiniteMyPostsFullKey() });
    },
  });
}

function buildFormData(post: CreatePost): FormData {
  const form = new FormData();

  form.append("postType", post.postType);
  form.append("title", post.title.trim());
  form.append("itemDescription", post.itemDescription.trim());

  if (post.productLink) {
    form.append("productLink", post.productLink.trim());
  }

  form.append("location", post.location.trim());
  if (!post.coordinates) {
    throw new Error("Coordinates are required");
  }
  form.append("latitude", post.coordinates.latitude.toString());
  form.append("longitude", post.coordinates.longitude.toString());

  if (post.mainImage) {
    form.append("mainImage", {
      uri: post.mainImage.uri.trim(),
      name: post.mainImage.name.trim(),
      type: post.mainImage.mimeType ?? "image/jpeg",
    } as any);
  }

  post.otherImages.forEach((image) => {
    form.append("otherImages", {
      uri: image.uri.trim(),
      name: image.name.trim(),
      type: image.mimeType ?? "image/jpeg",
    } as any);
  });

  return form;
}
