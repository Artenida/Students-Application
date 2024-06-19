import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { AuthUser, AuthContextType } from "./AuthContextTypes";

export interface AuthUser {
  _id: string;
  username: string;
  // password: string;
  token: string;
}

export interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("chat-user");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, []);

  const updateAuthUser = (user: AuthUser | null) => {
    setAuthUser(user);
    if (user) {
      localStorage.setItem("chat-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("chat-user");
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser: updateAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
