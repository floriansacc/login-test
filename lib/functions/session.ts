import { cookies } from "next/headers";
import {
  LoginInfoModel,
  loginInfoModelFromJson,
  loginInfoModelToString,
} from "../models/login_info_model";

export async function createSession(loginInfo: LoginInfoModel) {
  const cookieStore = await cookies();

  // 접속 정보 저장
  cookieStore.set("loginInfo", loginInfoModelToString(loginInfo), {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: true,
  });
}

export async function getLoginInfo(): Promise<LoginInfoModel | undefined> {
  const cookieStore = await cookies();
  const loginInfo = cookieStore.get("loginInfo")?.value;

  if (!loginInfo) return undefined;

  return loginInfoModelFromJson(loginInfo);
}
