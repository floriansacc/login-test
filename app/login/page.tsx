import { Metadata } from "next";
import LoginForm from "./LoginForm";
import { verifySession } from "@/lib/functions/dat";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
  description: "로그인",
};

export default async function LoginPage() {
  const session = await verifySession();

  if (session) {
    redirect("/main");
  }
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <p className="text-2xl font-semibold">Login</p>
      <LoginForm />
    </div>
  );
}
