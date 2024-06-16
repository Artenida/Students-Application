import React, { createContext, useContext, useState, ReactNode } from "react";
// import { AuthUser, AuthContextType } from "./AuthContextTypes";

// AuthContextTypes.ts
export interface AuthUser {
    id: string;
    username: string;
    password: string;
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
  const [authUser, setAuthUser] = useState<AuthUser | null>(
    JSON.parse(localStorage.getItem("chat-user") || "null")
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
