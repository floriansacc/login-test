"use client";

import { useEffect } from "react";
import { useSigninData } from "@/lib/context/SigninDataContext";
import SigninStep1Page from "./SigninStep1Page";
import SigninStep2Page from "./SigninStep2Page";
import SigninStep3Page from "./SigninStep3Page";

export default function SigninForm() {
  const { loginData, currentStep } = useSigninData();

  useEffect(() => {
    const alertUser = (e: BeforeUnloadEvent) => {
      if (loginData?.id) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, [loginData]);

  return (
    <div className="rounded-xl border border-solid border-gray-300 p-10">
      <div className="mb-5 flex w-full items-center justify-center gap-4">
        <div className={`${"bg-indigo-500"} h-2 w-10 transition-colors`}></div>
        <div
          className={`${currentStep === 2 || currentStep === 3 ? "bg-indigo-500" : "bg-gray-500"} h-2 w-10 transition-colors`}
        ></div>
        <div
          className={`${currentStep === 3 ? "bg-indigo-500" : "bg-gray-500"} h-2 w-10 transition-colors`}
        ></div>
      </div>

      {currentStep === 1 && <SigninStep1Page />}
      {currentStep === 2 && <SigninStep2Page />}
      {currentStep === 3 && <SigninStep3Page />}
    </div>
  );
}
