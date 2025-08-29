"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [loginData, setLoginData] = useState<{
    email: string | null;
    password: string | null;
  }>({ email: null, password: null });

  const router = useRouter();

  const handleUserLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
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
        placeholder="아이디"
      ></input>
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
