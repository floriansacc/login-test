export interface LoginInfoModel {
  // 1 단계 - 필수
  id?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;

  // 2 단계 - 옵션
  birthday?: string | null;
  gender?: "F" | "M" | "other" | null;

  // 3 단계 - 옵션
  socialPlatforms?: SocialModel[];
}

export const loginInfoModelFromJson = (json: any): LoginInfoModel => {
  return {
    id: json.id,
    password: json.password,
    email: json.email,
    phoneNumber: json.phoneNumber,
    birthday: json.birthday,
    gender: json.gender,
    socialPlatforms: socialModelFromJsonList(json.socialPlatforms),
  };
};

export const loginInfoModelToJson = (model: LoginInfoModel): any => {
  return {
    id: model.id,
    password: model.password,
    email: model.email,
    phoneNumber: model.phoneNumber,
    birthday: model.birthday,
    gender: model.gender,
    socialPlatforms: socialModelToJsonList(model.socialPlatforms ?? []),
  };
};

export const loginInfoModelToString = (model: LoginInfoModel): string => {
  return JSON.stringify(loginInfoModelToJson(model));
};

export const loginInfoModelFromString = (entry: string): LoginInfoModel => {
  return loginInfoModelFromJson(JSON.parse(entry));
};

export interface SocialModel {
  social: "google" | "kakao" | "naver";
  isConnected: boolean;
}

const socialModelFromJsonList = (json: any[]): SocialModel[] =>
  json.map((e) => socialModelFromJson(e));

const socialModelFromJson = (json: any): SocialModel => {
  return {
    social: json.social,
    isConnected: json.isConnected,
  };
};

const socialModelToJsonList = (model: SocialModel[]): any[] =>
  model.map((e) => socialModelToJson(e));

const socialModelToJson = (model: SocialModel): any => {
  return {
    social: model.social,
    isConnected: model.isConnected,
  };
};
