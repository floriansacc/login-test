import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifySession = cache(async (): Promise<boolean> => {
  const cookieStore = await cookies();

  let accessToken: string | null =
    cookieStore.get("accessToken")?.value ?? null;

  if (!accessToken || isTokenExpired(accessToken)) {
    // refreshToken 갱신 함수
    // 이 예제에 없어서 바로 redirect 하기
    if (!accessToken) return false;
  }

  const payload = _decodeJwt(accessToken);
  const user = payload?.sub || payload?.type;

  if (!user) return false;

  return true;
});

const _decodeJwt = (token: string) => {
  try {
    const base64Payload = token.split(".")[1];
    const json = Buffer.from(base64Payload, "base64").toString();
    return JSON.parse(json);
  } catch (e) {
    console.error("Failed to decode JWT", e);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = _decodeJwt(token);
  if (!payload?.exp) return true;

  const expiryInMs = payload.exp * 1000;
  return Date.now() > expiryInMs;
};
