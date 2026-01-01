import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV } from "src/config/env";
import z from "zod";

export type API = (url: string, options?: RequestInit) => Promise<Response>;

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  api: API;
};

const JwtSchema = z.object({
  sub: z.string(),
  iat: z.number(),
  exp: z.number(),
});

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const isAuthenticated = (() => {
    if (!token) return false;

    const body = JSON.parse(atob(token.split(".")[1]));
    const parsed = JwtSchema.safeParse(body);
    if (!parsed.success) return false;

    if (Date.now() >= parsed.data.exp * 1000) return false;

    return true;
  })();

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
    const isFormData = options.body instanceof FormData;

    const response = await fetch(`${ENV.API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!(200 <= response.status && response.status < 300)) {
      const errorText = await response.text();
      throw new Error(`Http request failed with status ${response.status}: ${errorText}`);
    }
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
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
