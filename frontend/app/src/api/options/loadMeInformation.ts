import { queryOptions } from "@tanstack/react-query";
import { API } from "src/context/AuthContext";
import { MeSchema } from "../types/Me";

export function loadMeInformation(api: API, token: string | null) {
  return queryOptions({
    queryKey: ["me", token],
    queryFn: async () => {
      const response = await api("/accounts/me");
      if (!response.ok) {
        const error = await response.json();
        throw new Error("Failed to load user information: " + error);
      }
      const data = await response.json();
      return MeSchema.parse(data);
    },
  });
}
