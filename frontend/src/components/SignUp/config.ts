import {
  FIELDS_NAME_SIGN_UP,
  IInitialValuesSignUp,
  IReternedInitialValuesSignUp,
} from "@components/SignUp/types";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@constants/regex";
import { TEXT } from "@messages/validation";
import * as Yup from "yup";

export const getInitialValuesSignUp = () => {
  const initialValues: IReternedInitialValuesSignUp = {
    [FIELDS_NAME_SIGN_UP.FIRST_NAME]: "",
    [FIELDS_NAME_SIGN_UP.LAST_NAME]: "",
    [FIELDS_NAME_SIGN_UP.EMAIL]: "",
    [FIELDS_NAME_SIGN_UP.PASSWORD]: "",
    [FIELDS_NAME_SIGN_UP.PASSWORD_CONFIRM]: "",
  };
  return initialValues;
};

export const getValidationSchemaSignUp = (
  t: (key: string) => string
): Yup.ObjectSchema<IInitialValuesSignUp> => {
  return Yup.object().shape({
    [FIELDS_NAME_SIGN_UP.FIRST_NAME]: Yup.string().required(
      t(TEXT.ERROR.REQUIRED_FIELD)
    ),
    [FIELDS_NAME_SIGN_UP.LAST_NAME]: Yup.string().required(
      t(TEXT.ERROR.REQUIRED_FIELD)
    ),
    [FIELDS_NAME_SIGN_UP.EMAIL]: Yup.string()
      .matches(EMAIL_REGEX, t(TEXT.ERROR.AUTH.INVALID_EMAIL))
      .required(t(TEXT.ERROR.REQUIRED_FIELD)),
    [FIELDS_NAME_SIGN_UP.PASSWORD]: Yup.string()
      .matches(PASSWORD_REGEX, t(TEXT.ERROR.AUTH.PASSWORD_FORMAT))
      .required(t(TEXT.ERROR.REQUIRED_FIELD)),
    [FIELDS_NAME_SIGN_UP.PASSWORD_CONFIRM]: Yup.string()
      .oneOf(
        [Yup.ref(FIELDS_NAME_SIGN_UP.PASSWORD)],
        t(TEXT.ERROR.AUTH.PASSWORDS_MUST_MATCH)
      )
      .required(t(TEXT.ERROR.REQUIRED_FIELD)),
  });
};
