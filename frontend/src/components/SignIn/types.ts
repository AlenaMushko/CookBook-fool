export enum FIELDS_NAME_SIGN_IN {
  EMAIL = "email",
  PASSWORD = "password",
}

export interface IReternedInitialValuesSignIn {
  [FIELDS_NAME_SIGN_IN.EMAIL]: string;
  [FIELDS_NAME_SIGN_IN.PASSWORD]: string;
}

export interface IInitialValuesSignIn {
  [FIELDS_NAME_SIGN_IN.EMAIL]?: string;
  [FIELDS_NAME_SIGN_IN.PASSWORD]?: string;
}
