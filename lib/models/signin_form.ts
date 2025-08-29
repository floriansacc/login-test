export interface SigninFormStep1Model {
  id?: string | null;
  password?: string | null;
  passwordConfirm?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
}

export interface SigninFormStep2Model {
  birthday?: string | null;
  gender?: "F" | "M" | "other" | null;
}
