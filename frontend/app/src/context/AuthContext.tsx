import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV } from "src/config/env";
import z from "zod";

export type API = (url: string, options?: RequestInit) => Promise<Response>;

const JwtSchema = z.object({
  sub: z.string(),
  iat: z.number(),
  exp: z.number(),
  name: z.string(),
});

export type JwtClaims = z.infer<typeof JwtSchema>;

type AuthContextType = {
  token: string | null;
  jwtClaims: JwtClaims | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  api: API;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const jwtClaims = useMemo(() => {
    if (!token) return null;
    const body = JSON.parse(atob(token.split(".")[1]));
    const result = JwtSchema.safeParse(body);
    if (!result.success) return null;
    return result.data;
  }, [token]);

  const isAuthenticated = useMemo(() => {
    if (!jwtClaims) return false;
    if (Date.now() >= jwtClaims.exp * 1000) return false;
    return true;
  }, [jwtClaims]);

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
    if (response.status === 401) {
      await logout();
      throw new Error("Unauthorized");
    } else if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Http request failed with status ${response.status}: ${errorText}`);
    }
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        jwtClaims,
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
