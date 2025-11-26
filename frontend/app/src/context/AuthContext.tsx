import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV } from "src/config/env";

export type API = (url: string, options?: RequestInit) => Promise<Response>;

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  api: API;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const saved = await AsyncStorage.getItem("token");
      if (saved) setToken(saved);
    };
    loadToken();
  }, []);

  const login = async (newToken: string) => {
    setToken(newToken);
    await AsyncStorage.setItem("token", newToken);
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem("token");
  };

  const api = async (url: string, options: RequestInit = {}) => {
    return fetch(`${ENV.API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
        api,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
