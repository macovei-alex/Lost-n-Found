export function useAuthContext() {
  return {
    isAuthenticated: true,
  };
}

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
