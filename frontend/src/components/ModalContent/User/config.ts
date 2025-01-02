import { IUser } from "@apiTypes/user.types";
import {
  FIELDS_NAME_USER,
  IInitialValuesUser,
  IReternedInitialValuesUser,
} from "@components/ModalContent/User/types";
import { PHONE_REGEX } from "@constants/regex";
import { TEXT } from "@messages/validation";
import * as Yup from "yup";

export const getInitialValuesUser = (user: { user: IUser }) => {
  const initialValues: IReternedInitialValuesUser = {
    [FIELDS_NAME_USER.FIRST_NAME]: user.user.firstName ?? "",
    [FIELDS_NAME_USER.LAST_NAME]: user.user.lastName ?? "",
    [FIELDS_NAME_USER.IMAGE]: user.user.image ?? null,
    [FIELDS_NAME_USER.PHONE]: user.user.phone ?? null,
  };
  return initialValues;
};

export const getValidationSchemaUser = (
  t: (key: string) => string
): Yup.ObjectSchema<IInitialValuesUser> => {
  return Yup.object().shape({
    [FIELDS_NAME_USER.FIRST_NAME]: Yup.string().required(
      t(TEXT.ERROR.REQUIRED_FIELD)
    ),
    [FIELDS_NAME_USER.LAST_NAME]: Yup.string().required(
      t(TEXT.ERROR.REQUIRED_FIELD)
    ),
    [FIELDS_NAME_USER.IMAGE]: Yup.string().nullable(),
    [FIELDS_NAME_USER.PHONE]: Yup.string()
      .matches(PHONE_REGEX, t(TEXT.ERROR.INVALID_PHONE))
      .nullable(),
  });
};
