import { queryOptions } from "@tanstack/react-query";
import { Coordinates } from "../types/Posts";
import { API } from "src/context/AuthContext";

export function loadAddressFromCoordinates(api: API, coordinates: Coordinates) {
  return queryOptions({
    queryKey: ["address", coordinates],
    queryFn: async () => {
      const response = await api(
        `/locations?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`,
      );
      if (!response.ok) {
        throw new Error("Failed to load address from coordinates");
      }
      return await response.text();
    },
  });
}
