"use server";

import { cache } from "react";
import { getLoginInfo } from "./session";

export const verifySession = cache(async (): Promise<boolean> => {
  const loginInfo = await getLoginInfo();

  if (!loginInfo) {
    // refreshToken 갱신 함수
    // 이 예제에 없어서 바로 redirect 하기
    if (!loginInfo) return false;
  }

  return true;
});
