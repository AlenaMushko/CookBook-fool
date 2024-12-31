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
  password: string;
  phone: string;
  image: string;
}

export interface IUserRes {
  data: IUser[];
  status: string;
}
