"use client";

import { useSigninData } from "@/lib/context/SigninDataContext";
import { logout } from "@/lib/functions/session";

export default function LogoutButton({ className }: LogoutButtonProps) {
  const { setLoginData } = useSigninData();

  const handleLogout = async () => {
    setLoginData(null);
    await logout();
  };
  return (
    <button
      onClick={handleLogout}
      className={`basic-button-class ${className}`}
    >
      로그아웃
    </button>
  );
}

interface LogoutButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
