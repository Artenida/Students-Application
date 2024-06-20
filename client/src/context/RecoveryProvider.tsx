import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface RecoveryContextType {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  otp: number | null;
  setOTP: Dispatch<SetStateAction<number | null>>;
}

export const RecoveryContext = createContext<RecoveryContextType | undefined>(undefined);

interface RecoveryProviderProps {
  children: ReactNode;
}

export const RecoveryProvider: React.FC<RecoveryProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOTP] = useState<number | null>(null);

  return (
    <RecoveryContext.Provider value={{ email, setEmail, otp, setOTP }}>
      {children}
    </RecoveryContext.Provider>
  );
};
