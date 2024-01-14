"use client";

import { ReactNode, createContext, useContext, useState } from "react";

type AuthContextType = {
  user: null | {
    id: number;
    username: string;
    email: string;
  };
  login: (token: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | {
    id: number;
    username: string;
    email: string;
  }>(null);

  

  const login = async(token: string) => {
    localStorage.setItem("auth_token", token);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
