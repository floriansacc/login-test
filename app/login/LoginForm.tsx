"use client";

import { createSession } from "@/lib/functions/session";
import {
  LoginInfoModel,
  loginInfoModelFromStringList,
} from "@/lib/models/login_info_model";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [loginData, setLoginData] = useState<{
    email: string | null;
    password: string | null;
  }>({ email: null, password: null });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleUserLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const db = window.localStorage.getItem("database");
      const currentAccountInfo: LoginInfoModel[] = loginInfoModelFromStringList(
        db ?? "[]",
      );

      const isRegisteredEmail = loginData?.email?.includes("@")
        ? currentAccountInfo.find((e) => e.email === loginData?.email)
        : currentAccountInfo.find((e) => e.id === loginData?.email);

      if (isRegisteredEmail) {
        // success
        await createSession(isRegisteredEmail);
        router.push("/main");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("아이디 및 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleNavigateSignin = () => {
    router.push("/signin");
  };

  return (
    <form
      key="login-form"
      onSubmit={handleUserLogin}
      className="flex flex-col items-start justify-start gap-1"
    >
      <span className="mt-2 pl-1">아이디</span>
      <input
        value={loginData.email ?? ""}
        onChange={(e) =>
          setLoginData((prev) => ({ ...prev, email: e.target.value }))
        }
        className="input-class border-indigo-700"
        type="text"
        placeholder="아이디 또는 이메일"
      ></input>
      {errorMessage && (
        <span className="text-sm text-red-500">{errorMessage}</span>
      )}
      <span className="mt-2 pl-1">비밀번호</span>
      <input
        value={loginData.password ?? ""}
        onChange={(e) =>
          setLoginData((prev) => ({ ...prev, password: e.target.value }))
        }
        className="input-class border-indigo-700"
        type="password"
        placeholder="비밀번호"
      ></input>
      <button type="submit" className="basic-button-class mt-4">
        로그인
      </button>

      <p
        onClick={handleNavigateSignin}
        className="mt-4 cursor-pointer self-end font-semibold text-gray-600 underline"
      >
        계정 없으면? 회원가입
      </p>
    </form>
  );
}
