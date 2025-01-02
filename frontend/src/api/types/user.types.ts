export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  phone: string;
}

export interface IUpdateUserReq {
  firstName: string;
  lastName: string;
  image: string | null;
  phone: string | null;
  deviceId: string;
}

export interface IUserRes {
  data: IUser[];
  status: string;
}
