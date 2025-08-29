"use client";

import { useSigninData } from "@/lib/context/SigninDataContext";
import { SigninFormStep1Model } from "@/lib/models/signin_form";
import { useEffect, useState } from "react";

export default function SigninStep1Page() {
  const [data, setData] = useState<SigninFormStep1Model>({
    id: null,
    password: null,
    passwordConfirm: null,
    email: null,
    phoneNumber: null,
  });

  const [errorMessage, setErrorMessage] = useState<SigninFormStep1Model>({
    id: null,
    password: null,
    passwordConfirm: null,
    email: null,
    phoneNumber: null,
  });

  const { loginData, setLoginData, setCurrentStep } = useSigninData();

  const handleUserSigninStep1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setErrorMessage({
      id: null,
      password: null,
      passwordConfirm: null,
      email: null,
      phoneNumber: null,
    });

    // flag
    let isValid = true;

    if (!data.id) {
      isValid = false;
      setErrorMessage((prev) => ({ ...prev, id: "아이디를 입력해주세요" }));
    }
    if (!data.password) {
      isValid = false;
      setErrorMessage((prev) => ({
        ...prev,
        password: "비밀번호를 입력해주세요",
      }));
    }
    if (data.password != data.passwordConfirm) {
      isValid = false;
      setErrorMessage((prev) => ({
        ...prev,
        passwordConfirm: "비빔번호를 일치하지 않습니다",
      }));
    }
    if (!data.email) {
      isValid = false;
      setErrorMessage((prev) => ({
        ...prev,
        email: "이메일을 입력해주세요",
      }));
    }
    if (!data.phoneNumber) {
      isValid = false;
      setErrorMessage((prev) => ({
        ...prev,
        phoneNumber: "전화번호를 입력해주세요",
      }));
    }

    if (!isValid) {
      return;
    }

    console.log("go to next step");
    setLoginData((prev) => ({
      ...prev,
      id: data.id!,
      email: data.email!,
      password: data.password!,
      phoneNumber: data.phoneNumber!,
    }));
    setCurrentStep(2);
  };

  // Reset error message
  const handleResetFields = () => {
    setData({
      id: null,
      password: null,
      passwordConfirm: null,
      email: null,
      phoneNumber: null,
    });

    setErrorMessage({
      id: null,
      password: null,
      passwordConfirm: null,
      email: null,
      phoneNumber: null,
    });
  };

  useEffect(() => {
    if (!loginData) return;

    setData({
      id: loginData.id,
      password: loginData.password,
      email: loginData.email,
      phoneNumber: loginData.phoneNumber,
    });
  }, [loginData]);

  return (
    <form
      key="signin-form-step-1"
      onSubmit={handleUserSigninStep1}
      className="flex flex-col items-start justify-start gap-1"
    >
      <span className="mt-2 pl-1">아이디</span>
      <input
        value={data.id ?? ""}
        onChange={(e) => setData((prev) => ({ ...prev, id: e.target.value }))}
        className={`${errorMessage.id ? "border-red-700 ring-red-600" : "border-indigo-700"} input-class`}
        type="text"
        placeholder="아이디"
      ></input>
      {errorMessage.id && (
        <span className="text-sm text-red-500">{errorMessage.id}</span>
      )}
      <span className="mt-2 pl-1">비밀번호</span>
      <input
        value={data.password ?? ""}
        onChange={(e) =>
          setData((prev) => ({ ...prev, password: e.target.value }))
        }
        className={`${errorMessage.password ? "border-red-700 ring-red-600" : "border-indigo-700"} input-class`}
        type="password"
        placeholder="비밀번호"
      ></input>
      {errorMessage.password && (
        <span className="text-sm text-red-500">{errorMessage.password}</span>
      )}

      <span className="mt-2 pl-1">비밀번호 확인</span>
      <input
        value={data.passwordConfirm ?? ""}
        onChange={(e) =>
          setData((prev) => ({ ...prev, passwordConfirm: e.target.value }))
        }
        className={`${errorMessage.passwordConfirm ? "border-red-700 ring-red-600" : "border-indigo-700"} input-class`}
        type="password"
        placeholder="비밀번호 확인"
      ></input>
      {errorMessage.passwordConfirm && (
        <span className="text-sm text-red-500">
          {errorMessage.passwordConfirm}
        </span>
      )}

      <span className="mt-2 pl-1">이메일</span>
      <input
        value={data.email ?? ""}
        onChange={(e) =>
          setData((prev) => ({ ...prev, email: e.target.value }))
        }
        className={`${errorMessage.email ? "border-red-700 ring-red-600" : "border-indigo-700"} input-class`}
        type="text"
        placeholder="이메일"
      ></input>
      {errorMessage.email && (
        <span className="text-sm text-red-500">{errorMessage.email}</span>
      )}

      <span className="mt-2 pl-1">전화번호</span>
      <input
        value={data.phoneNumber ?? ""}
        onChange={(e) =>
          setData((prev) => ({ ...prev, phoneNumber: e.target.value }))
        }
        className={`${errorMessage.phoneNumber ? "border-red-700 ring-red-600" : "border-indigo-700"} input-class`}
        type="number"
        placeholder="전화번호"
      ></input>
      {errorMessage.phoneNumber && (
        <span className="text-sm text-red-500">{errorMessage.phoneNumber}</span>
      )}

      <button type="submit" className="basic-button-class mt-4">
        다음단계
      </button>
      <button
        type="button"
        onClick={handleResetFields}
        className="basic-button-reverse-class mt-4"
      >
        초기화
      </button>
    </form>
  );
}
