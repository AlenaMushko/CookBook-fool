import { useUpdateUserMutation } from "@apis/userAPI";
import { IUpdateUserReq, IUser } from "@apiTypes/user.types";
import {
  getInitialValuesUser,
  getValidationSchemaUser,
} from "@components/ModalContent/User/config";
import { FIELDS_NAME_USER } from "@components/ModalContent/User/types";
import { FIELDS_NAME_SIGN_UP } from "@components/SignUp/types";
import { Button, FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import CustomInput from "@shared/CustomInput";
import CustomPhoneInput from "@shared/PhoneInput";
import { getDeviceId } from "@utils/device";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import theme from "../../../../theme";

interface UserFormProps {
  userData: IUser;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserForm: React.FC<UserFormProps> = ({ userData, setIsFormOpen }) => {
  const { t } = useTranslation();
  const [updateUser] = useUpdateUserMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const formik = useFormik({
    initialValues: getInitialValuesUser({ user: userData }),
    validationSchema: getValidationSchemaUser(t),
    onSubmit: async (values) => {
      const deviceId = getDeviceId();

      const newUser: IUpdateUserReq = {
        firstName: values[FIELDS_NAME_USER.FIRST_NAME],
        lastName: values[FIELDS_NAME_USER.LAST_NAME],
        image: values[FIELDS_NAME_USER.IMAGE] ?? null,
        phone: values[FIELDS_NAME_USER.PHONE] ?? null,
        password: values[FIELDS_NAME_USER.PASSWORD],
        deviceId,
      };

      try {
        await updateUser({
          userId: userData.id,
          userData: newUser,
          t,
        }).unwrap();
        formik.resetForm();
        setIsFormOpen(false);
      } catch (e: any) {
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <FormControl
        component='form'
        onSubmit={formik.handleSubmit}
        sx={{
          width: { xs: "100%" },
          p: { xs: 2, sm: 4 },
          backgroundColor: theme.palette.primary.contrastText,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CustomInput
          formik={formik}
          isInvalid={
            formik.touched[FIELDS_NAME_USER.FIRST_NAME] &&
            Boolean(formik.errors[FIELDS_NAME_USER.FIRST_NAME])
          }
          name={FIELDS_NAME_USER.FIRST_NAME}
          type='text'
          label={t("user.firstName")}
          placeholder={t("user.enterFirstName")}
          helpText={
            formik.touched[FIELDS_NAME_USER.FIRST_NAME]
              ? formik.errors[FIELDS_NAME_USER.FIRST_NAME]
              : ""
          }
          value={formik.values[FIELDS_NAME_SIGN_UP.FIRST_NAME]}
          onHandleChange={formik.handleChange}
          onHandleBlur={formik.handleBlur}
          mb={20}
          isRequired={true}
        />

        <CustomInput
          formik={formik}
          isInvalid={
            formik.touched[FIELDS_NAME_USER.LAST_NAME] &&
            Boolean(formik.errors[FIELDS_NAME_USER.LAST_NAME])
          }
          name={FIELDS_NAME_USER.LAST_NAME}
          type='text'
          label={t("user.lastName")}
          placeholder={t("user.enterLastName")}
          helpText={
            formik.touched[FIELDS_NAME_USER.LAST_NAME]
              ? formik.errors[FIELDS_NAME_USER.LAST_NAME]
              : ""
          }
          value={formik.values[FIELDS_NAME_USER.LAST_NAME]}
          onHandleChange={formik.handleChange}
          onHandleBlur={formik.handleBlur}
          mb={20}
          isRequired={true}
        />

        <CustomInput
          formik={formik}
          isInvalid={
            formik.touched[FIELDS_NAME_USER.IMAGE] &&
            Boolean(formik.errors[FIELDS_NAME_USER.IMAGE])
          }
          name={FIELDS_NAME_USER.IMAGE}
          type='text'
          label={t("user.image")}
          placeholder={t("user.enterImage")}
          helpText={
            formik.touched[FIELDS_NAME_USER.IMAGE]
              ? formik.errors[FIELDS_NAME_USER.IMAGE]
              : ""
          }
          value={formik.values[FIELDS_NAME_USER.IMAGE]}
          onHandleChange={formik.handleChange}
          onHandleBlur={formik.handleBlur}
          mb={20}
        />

        <CustomPhoneInput
          label={t("user.phone")}
          fieldName={FIELDS_NAME_USER.PHONE}
          formikValues={formik.values}
          formikTouched={formik.touched}
          formikErrors={formik.errors}
          setFieldValue={formik.setFieldValue}
          mb={20}
        />

        <CustomInput
          formik={formik}
          isInvalid={
            formik.touched[FIELDS_NAME_USER.PASSWORD] &&
            Boolean(formik.errors[FIELDS_NAME_USER.PASSWORD])
          }
          name={FIELDS_NAME_USER.PASSWORD}
          type='password'
          label={t("user.password")}
          placeholder={t("user.enterPassword")}
          helpText={
            formik.touched[FIELDS_NAME_USER.PASSWORD]
              ? formik.errors[FIELDS_NAME_USER.PASSWORD]
              : ""
          }
          value={formik.values[FIELDS_NAME_USER.PASSWORD]}
          onHandleChange={formik.handleChange}
          onHandleBlur={formik.handleBlur}
          password
          setShow={() => setShowPassword(!showPassword)}
          show={showPassword}
          mb={20}
          isRequired={true}
        />
        <CustomInput
          formik={formik}
          isInvalid={
            formik.touched[FIELDS_NAME_USER.PASSWORD_CONFIRM] &&
            Boolean(formik.errors[FIELDS_NAME_USER.PASSWORD_CONFIRM])
          }
          name={FIELDS_NAME_USER.PASSWORD_CONFIRM}
          type='password'
          label={t("user.confirmPassword")}
          placeholder={t("user.enterConfirmPassword")}
          helpText={
            formik.touched[FIELDS_NAME_USER.PASSWORD_CONFIRM]
              ? formik.errors[FIELDS_NAME_USER.PASSWORD_CONFIRM]
              : ""
          }
          value={formik.values[FIELDS_NAME_USER.PASSWORD_CONFIRM]}
          onHandleChange={formik.handleChange}
          onHandleBlur={formik.handleBlur}
          password
          setShow={() => setShowPasswordConfirm(!showPasswordConfirm)}
          show={showPasswordConfirm}
          mb={40}
          isRequired={true}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => setIsFormOpen(false)}
              type='button'
              variant='contained'
              color='primary'
              sx={{
                backgroundColor: theme.palette.secondary.light,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.main,
                },
              }}
            >
              {t("goToProfile")}
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              sx={{
                backgroundColor: theme.palette.primary.dark,
                "&:hover": {
                  backgroundColor: theme.palette?.colors?.btnBgHover,
                },
              }}
            >
              {t("update")}
            </Button>
          </Box>
        </Box>
      </FormControl>
    </div>
  );
};

export default UserForm;
