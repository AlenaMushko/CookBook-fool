import { USER_STATUS } from "@api/types/user.types";

export interface ISignUpRes {
  data: {
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
    status: USER_STATUS;
  };
  status: string;
}

export interface ICreateUserReq {
  password: string;
  firstName: string;
  lastName: string;
  status: USER_STATUS;
}

export interface IValidateTokenRes {
  data: {
    role: string;
    status: USER_STATUS;
    userId: string;
    email: string;
  };
  status: string;
}
