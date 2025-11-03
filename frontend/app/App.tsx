import { StatusBar } from "expo-status-bar";
import { useUnistyles } from "react-native-unistyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "src/navigation/Navigation";

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

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style={theme.statusBarStyle} />
      <Navigation />
    </QueryClientProvider>
  );
}
