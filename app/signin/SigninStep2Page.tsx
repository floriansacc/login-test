"use client";

import { useSigninData } from "@/lib/context/SigninDataContext";
import { SigninFormStep2Model } from "@/lib/models/signin_form";
import { useEffect, useState } from "react";

export default function SigninStep2Page() {
  const [data, setData] = useState<SigninFormStep2Model>({
    birthday: null,
    gender: "F",
  });

  const { loginData, setLoginData, setCurrentStep } = useSigninData();

  const handleUserSigninStep2 = () => {
    // 필수 아닌 필드
    setLoginData((prev) => ({
      ...prev,
      birthday: data.birthday,
      gender: data.gender,
    }));

    setCurrentStep(3);
  };

  useEffect(() => {
    if (!loginData) return;

    setData(() => ({
      birthday: loginData.birthday,
      gender: loginData.gender ?? "F",
    }));
  }, [loginData]);

  return (
    <form
      key="signin-form-step-2"
      onSubmit={handleUserSigninStep2}
      className="flex flex-col items-start justify-start gap-1"
    >
      <span className="mt-2 pl-1">생년월일</span>
      <input
        value={data.birthday ?? ""}
        onChange={(e) =>
          setData((prev) => ({ ...prev, birthday: e.target.value }))
        }
        className={`input-class border-indigo-700`}
        type="text"
        placeholder="생년월일"
      ></input>

      <div className="mt-2 flex w-full items-center justify-start gap-4">
        <label className="group flex cursor-pointer flex-col gap-1 text-xs">
          여성
          <input
            className={`border-indigo-700`}
            onChange={() => setData((prev) => ({ ...prev, gender: "F" }))}
            type="radio"
            checked={data.gender == "F"}
            placeholder="여성"
          ></input>
        </label>
        <label className="group flex cursor-pointer flex-col gap-1 text-xs">
          남성
          <input
            className={`border-indigo-700`}
            onChange={() => setData((prev) => ({ ...prev, gender: "M" }))}
            type="radio"
            checked={data.gender == "M"}
            placeholder="남성"
          ></input>
        </label>
        <label className="group flex cursor-pointer flex-col gap-1 text-xs">
          기타
          <input
            className={`border-indigo-700`}
            onChange={() => setData((prev) => ({ ...prev, gender: "other" }))}
            type="radio"
            checked={data.gender == "other"}
          ></input>
        </label>
      </div>

      <div className="mt-4 flex w-full items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="basic-button-reverse-class"
        >
          이전 단계
        </button>
        <button type="submit" className="basic-button-class">
          다음단계
        </button>
      </div>
    </form>
  );
}
