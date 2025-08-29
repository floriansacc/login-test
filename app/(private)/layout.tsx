import TopBanner from "@/lib/components/TopBanner";
import { verifySession } from "@/lib/functions/dat";
import { redirect } from "next/navigation";

export default async function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth: boolean = await verifySession();

  if (!isAuth) {
    // 인증 없으면 로그인 페이지로 이동
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <TopBanner />
      {children}
    </main>
  );
}
