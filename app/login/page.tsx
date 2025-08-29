import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "로그인",
};

export default async function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <p className="text-2xl font-semibold">Login</p>
      <LoginForm />
    </div>
  );
}
