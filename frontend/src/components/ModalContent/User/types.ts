export enum FIELDS_NAME_USER {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  IMAGE = "image",
  PHONE = "phone",
}

export interface IReternedInitialValuesUser {
  [FIELDS_NAME_USER.FIRST_NAME]: string;
  [FIELDS_NAME_USER.LAST_NAME]: string;
  [FIELDS_NAME_USER.IMAGE]: string | null;
  [FIELDS_NAME_USER.PHONE]: string | null;
}

export interface IInitialValuesUser {
  [FIELDS_NAME_USER.FIRST_NAME]?: string;
  [FIELDS_NAME_USER.LAST_NAME]?: string;
  [FIELDS_NAME_USER.IMAGE]?: string | null;
  [FIELDS_NAME_USER.PHONE]?: string | null;
}
