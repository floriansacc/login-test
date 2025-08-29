"use server";

import { cookies } from "next/headers";
import {
  LoginInfoModel,
  loginInfoModelFromJson,
  loginInfoModelToString,
} from "../models/login_info_model";
import { redirect } from "next/navigation";

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
  try {
    const cookieStore = await cookies();
    const loginInfo = cookieStore.get("loginInfo")?.value;

    if (!loginInfo) return undefined;

    return loginInfoModelFromJson(JSON.parse(loginInfo));
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function logout() {
  const cookieStore = await cookies();

  try {
    cookieStore.delete("loginInfo");
    redirect("/login");
  } catch (error) {
    console.log(error);
    redirect("/login");
  }
}
