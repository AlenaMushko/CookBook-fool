import { IUser } from "@apiTypes/user.types";
import {
  FIELDS_NAME_USER,
  IInitialValuesUser,
  IReternedInitialValuesUser,
} from "@components/ModalContent/User/types";
import { FIELDS_NAME_SIGN_UP } from "@components/SignUp/types";
import { PASSWORD_REGEX, PHONE_REGEX } from "@constants/regex";
import { TEXT } from "@messages/validation";
import * as Yup from "yup";

export const getInitialValuesUser = (user: { user: IUser }) => {
  const initialValues: IReternedInitialValuesUser = {
    [FIELDS_NAME_USER.FIRST_NAME]: user.user.firstName ?? "",
    [FIELDS_NAME_USER.LAST_NAME]: user.user.lastName ?? "",
    [FIELDS_NAME_USER.IMAGE]: user.user.image ?? null,
    [FIELDS_NAME_USER.PHONE]: user.user.phone ?? null,
    [FIELDS_NAME_USER.PASSWORD]: "",
    [FIELDS_NAME_USER.PASSWORD_CONFIRM]: "",
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
    [FIELDS_NAME_USER.PASSWORD]: Yup.string()
      .matches(PASSWORD_REGEX, t(TEXT.ERROR.AUTH.PASSWORD_FORMAT))
      .required(t(TEXT.ERROR.REQUIRED_FIELD)),
    [FIELDS_NAME_USER.PASSWORD_CONFIRM]: Yup.string()
      .oneOf(
        [Yup.ref(FIELDS_NAME_USER.PASSWORD)],
        t(TEXT.ERROR.AUTH.PASSWORDS_MUST_MATCH)
      )
      .required(t(TEXT.ERROR.REQUIRED_FIELD)),
  });
};
