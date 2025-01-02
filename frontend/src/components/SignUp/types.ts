export enum FIELDS_NAME_SIGN_UP {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
  PASSWORD = "password",
  PASSWORD_CONFIRM = "passwordConfirm",
}

export interface IReternedInitialValuesSignUp {
  [FIELDS_NAME_SIGN_UP.FIRST_NAME]: string;
  [FIELDS_NAME_SIGN_UP.LAST_NAME]: string;
  [FIELDS_NAME_SIGN_UP.EMAIL]: string;
  [FIELDS_NAME_SIGN_UP.PASSWORD]: string;
  [FIELDS_NAME_SIGN_UP.PASSWORD_CONFIRM]: string;
}

export interface IInitialValuesSignUp {
  [FIELDS_NAME_SIGN_UP.FIRST_NAME]?: string;
  [FIELDS_NAME_SIGN_UP.LAST_NAME]?: string;
  [FIELDS_NAME_SIGN_UP.EMAIL]?: string;
  [FIELDS_NAME_SIGN_UP.PASSWORD]?: string;
  [FIELDS_NAME_SIGN_UP.PASSWORD_CONFIRM]?: string;
}
