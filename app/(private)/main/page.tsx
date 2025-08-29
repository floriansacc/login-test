import { getLoginInfo } from "@/lib/functions/session";
import { Metadata } from "next";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "우리의이야기 대시보드",
};

export default async function MainPage() {
  const loginInfo = await getLoginInfo();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <p className="mb-5 text-5xl">대시보드</p>
      <div className="flex w-full flex-col items-start sm:w-[300px]">
        <p>
          <span className="font-semibold">이메일:</span> {loginInfo?.email}
        </p>
        <p>
          <span className="font-semibold">아이디:</span> {loginInfo?.id}
        </p>
        <p>
          <span className="font-semibold">전화번호:</span>{" "}
          {loginInfo?.phoneNumber}
        </p>
        <p>
          <span className="font-semibold">생일:</span> {loginInfo?.birthday}
        </p>
        <p>
          <span className="font-semibold">성별:</span> {loginInfo?.gender}
        </p>
        <p>
          <span className="font-semibold">소셜:</span>{" "}
          {loginInfo?.socialPlatforms?.map((e) => e.social).join(", ")}
        </p>
        <LogoutButton className="mt-6" />
      </div>
    </div>
  );
}
