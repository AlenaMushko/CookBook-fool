export interface IUser {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  isActive: USER_STATUS;
  _id: string;
}

export enum USER_STATUS {
  ACTIVE = "Active",
  PENDING = "Pending",
}

export interface IInviteUserRes {
  data: {
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    password: string;
    isActive: USER_STATUS;
    _id: string;
  };
  status: string;
}

export interface IUserRes {
  data: IUser[];
  status: string;
}

export interface IInviteUserReq {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  isActive: USER_STATUS;
}

export interface IResendingInviteUserReq {
  _id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  isActive: USER_STATUS;
}
