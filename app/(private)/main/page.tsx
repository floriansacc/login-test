import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "우리의이야기 대시보드",
};

export default async function MainPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p className="text-5xl">대시보드</p>
    </div>
  );
}
