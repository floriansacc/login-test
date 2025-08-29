"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { LoginInfoModel } from "../models/login_info_model";

type SigninContextType = {
  currentStep: 1 | 2 | 3 | "done";
  loginData: LoginInfoModel | null;
  setLoginData: React.Dispatch<React.SetStateAction<LoginInfoModel | null>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<1 | 2 | 3 | "done">>;
};

const SigninDataContext = createContext<SigninContextType | undefined>(
  undefined,
);

export const SigninDataProvider = ({ children }: { children: ReactNode }) => {
  const [loginData, setLoginData] = useState<LoginInfoModel | null>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | "done">(1);
  return (
    <SigninDataContext.Provider
      value={{ loginData, setLoginData, currentStep, setCurrentStep }}
    >
      {children}
    </SigninDataContext.Provider>
  );
};

export const useSigninData = () => {
  const context = useContext(SigninDataContext);
  if (!context) {
    throw new Error("useSigninData must be used within a SigninDataProvider");
  }
  return context;
};
