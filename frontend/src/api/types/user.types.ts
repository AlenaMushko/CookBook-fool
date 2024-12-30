export interface IUser {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  id: string;
}

export interface IInviteUserRes {
  data: {
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    password: string;
    id: string;
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
}

export interface IResendingInviteUserReq {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}
