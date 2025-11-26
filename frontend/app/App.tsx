import { StatusBar } from "expo-status-bar";
import { useUnistyles } from "react-native-unistyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "src/navigation/Navigation";
import { AuthProvider } from "src/context/AuthContext";
import { ENV } from "src/config/env";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3600 * 1000,
      gcTime: 3600 * 1000,
      retry: false,
    },
  },
});

export default function App() {
  const { theme } = useUnistyles();

  fetch(`${ENV.API_BASE_URL}/health`).catch(() => {
    console.error("Health check failed. Check your internet connection");
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusBar style={theme.statusBarStyle} />
        <Navigation />
      </AuthProvider>
    </QueryClientProvider>
  );
}
