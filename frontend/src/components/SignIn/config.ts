import {
  FIELDS_NAME_SIGN_IN,
  IInitialValuesSignIn,
  IReternedInitialValuesSignIn,
} from "@components/SignIn/types";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@constants/regex";
import { TEXT } from "@messages/validation";
import * as Yup from "yup";

export const getInitialValuesSignIn = () => {
  const initialValues: IReternedInitialValuesSignIn = {
    [FIELDS_NAME_SIGN_IN.EMAIL]: "",
    [FIELDS_NAME_SIGN_IN.PASSWORD]: "",
  };
  return initialValues;
};

export const getValidationSchemaSignIn = (
  t: (key: string) => string
): Yup.ObjectSchema<IInitialValuesSignIn> => {
  return Yup.object().shape({
    [FIELDS_NAME_SIGN_IN.EMAIL]: Yup.string()
      .matches(EMAIL_REGEX, t(TEXT.ERROR.AUTH.INVALID_EMAIL))
      .required(t(TEXT.ERROR.REQUIRED_FIELD)),
    [FIELDS_NAME_SIGN_IN.PASSWORD]: Yup.string()
      .matches(PASSWORD_REGEX, t(TEXT.ERROR.AUTH.PASSWORD_FORMAT))
      .required(t(TEXT.ERROR.REQUIRED_FIELD)),
  });
};
