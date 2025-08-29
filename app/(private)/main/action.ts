import { logout } from "@/lib/functions/session";

export const logoutUser = async () => {
  try {
    await logout();
  } catch (error) {
    console.log(error);
  }
};
