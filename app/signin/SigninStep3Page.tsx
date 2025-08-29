"use client";

import { useState } from "react";
import { useSigninData } from "@/lib/context/SigninDataContext";
import {
  LoginInfoModel,
  loginInfoModelFromStringList,
  loginInfoModelListToString,
  SocialModel,
} from "@/lib/models/login_info_model";
import { useRouter } from "next/navigation";

export default function SigninStep3Page() {
  const [data, setData] = useState<SocialModel[]>([
    { social: "google", isConnected: false },
    { social: "naver", isConnected: false },
    { social: "kakao", isConnected: false },
  ]);

  const router = useRouter();

  const { loginData, setLoginData, setCurrentStep } = useSigninData();

  const handleUserSigninStep3 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // 필수 아닌 필드
    setLoginData((prev) => ({
      ...prev,
      socialPlatforms: data,
    }));

    // setCurrentStep("done");
    try {
      const db = window.localStorage.getItem("database");
      const currentAccountInfo: LoginInfoModel[] = loginInfoModelFromStringList(
        db ?? "[]",
      );

      if (loginData) {
        const isExist =
          currentAccountInfo.some((e) => e.id === loginData?.id) ||
          currentAccountInfo.some((e) => e.email === loginData?.email);

        if (isExist) {
          alert("같은 아이디나 이메일로 가입한 계정이 있습니다.");
          return;
        }

        currentAccountInfo.push(loginData);

        const updatedDb = loginInfoModelListToString(currentAccountInfo);

        window.localStorage.setItem("database", updatedDb);
      }
    } catch (error) {
      console.log(error);
    }
    alert("회원가입이 완료되었습니다!");
    router.push("/login");
  };

  const handleCheckboxChange = (social: string) => {
    const currentState: boolean =
      data.find((e) => e.social === social)?.isConnected === true;

    setData((prev) => {
      const newList = [...prev];
      const rightData = newList.findIndex((e) => e.social === social);

      if (rightData !== -1) {
        newList[rightData].isConnected = !currentState;
      }

      return newList;
    });
  };

  return (
    <form
      key="signin-form-step-3"
      onSubmit={handleUserSigninStep3}
      className="flex flex-col items-start justify-start gap-1 select-none"
    >
      <span className="mb-2 font-semibold">연동할 소셜 계정을 선택하세요</span>
      <div className="flex w-full flex-col items-start justify-start gap-4 sm:w-[300px]">
        <label className="flex gap-2">
          <input
            onChange={() => handleCheckboxChange("google")}
            checked={
              data.find((e) => e.social === "google")?.isConnected === true
            }
            type="checkbox"
            className="mr-2"
          ></input>
          <img src={"/google_logo.png"} className="h-6 w-6" />
          구글 연동
        </label>

        <label className="flex gap-2">
          <input
            onChange={() => handleCheckboxChange("naver")}
            checked={
              data.find((e) => e.social === "naver")?.isConnected === true
            }
            type="checkbox"
            className="mr-2"
          ></input>
          <img src={"/naver_logo.svg"} className="h-6 w-6" />
          네이버 연동
        </label>

        <label className="flex gap-2">
          <input
            onChange={() => handleCheckboxChange("kakao")}
            checked={
              data.find((e) => e.social === "kakao")?.isConnected === true
            }
            type="checkbox"
            className="mr-2"
          ></input>
          <img src={"/kakao_logo.svg"} className="h-6 w-6" />
          카카오 연동
        </label>
      </div>

      <div className="mt-4 flex w-full items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className="basic-button-reverse-class"
        >
          이전 단계
        </button>
        <button type="submit" className="basic-button-class">
          회원가입
        </button>
      </div>
    </form>
  );
}
