import { SigninDataProvider } from "@/lib/context/SigninDataContext";

export default async function SigninLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SigninDataProvider>{children}</SigninDataProvider>;
}
