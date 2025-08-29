import { SigninDataProvider } from "@/lib/context/SigninDataContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="antialiased">
        <SigninDataProvider>{children}</SigninDataProvider>
      </body>
    </html>
  );
}
