import { IUser } from "@apiTypes/user.types";

export interface ISignUpRes {
  user: IUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ICreateUserReq {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  deviceId: string;
}

export interface ISignInReq {
  email: string;
  password: string;
  deviceId: string;
}
