export enum FIELDS_NAME_USER {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  IMAGE = "image",
  PHONE = "phone",
  PASSWORD = "password",
  PASSWORD_CONFIRM = "passwordConfirm",
}

export interface IReternedInitialValuesUser {
  [FIELDS_NAME_USER.FIRST_NAME]: string;
  [FIELDS_NAME_USER.LAST_NAME]: string;
  [FIELDS_NAME_USER.IMAGE]: string | null;
  [FIELDS_NAME_USER.PHONE]: string | null;
  [FIELDS_NAME_USER.PASSWORD]: string;
  [FIELDS_NAME_USER.PASSWORD_CONFIRM]: string;
}

export interface IInitialValuesUser {
  [FIELDS_NAME_USER.FIRST_NAME]?: string;
  [FIELDS_NAME_USER.LAST_NAME]?: string;
  [FIELDS_NAME_USER.IMAGE]?: string | null;
  [FIELDS_NAME_USER.PHONE]?: string | null;
  [FIELDS_NAME_USER.PASSWORD]?: string;
  [FIELDS_NAME_USER.PASSWORD_CONFIRM]?: string;
}
