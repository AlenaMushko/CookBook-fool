import "react-phone-input-2/lib/style.css";

import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { FormikErrors, FormikTouched, getIn } from "formik";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";

import theme from "../../theme";

interface CustomPhoneInputProps {
  label: string;
  fieldName: string;
  formikValues: any;
  formikTouched: FormikTouched<any>;
  formikErrors: FormikErrors<any>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  isRequired?: boolean;
  defaultCountry?: string;
  disabled?: boolean;
  mb?: number;
  mr?: number;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  label,
  fieldName,
  formikValues,
  formikTouched,
  formikErrors,
  setFieldValue,
  isRequired = false,
  defaultCountry = "us",
  disabled = false,
  mb = 2,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const value = getIn(formikValues, fieldName);
  const touched = getIn(formikTouched, fieldName);
  const error = getIn(formikErrors, fieldName);
  const isError = touched && error;

  return (
    <FormControl
      fullWidth
      variant='outlined'
      error={!!isError}
      required={isRequired}
      sx={{
        position: "relative",
        background: "inherit",
        mb: `${mb}px`,
      }}
    >
      {label && (
        <InputLabel
          shrink
          htmlFor={fieldName}
          sx={{
            fontWeight: 700,
            fontSize: "1rem",
            "&.Mui-focused": {
              color: theme.palette.secondary.light,
            },
            "& .MuiFormLabel-asterisk": {
              color: "red",
            },
            transform: "translate(14px, 14px) scale(1)",
            "&.MuiInputLabel-shrink": {
              transform: "translate(14px, -6px) scale(0.75)",
              backgroundColor: theme.palette.primary.contrastText,
              padding: "0 4px",
            },
          }}
        >
          {label}
        </InputLabel>
      )}
      <PhoneInput
        country={defaultCountry}
        value={value}
        onChange={(phone) => setFieldValue(fieldName, `+${phone}`)}
        inputStyle={{
          width: "100%",
          height: "54px",
          fontSize: "14px",
          borderRadius: "4px",
          border: isFocused
            ? `1px solid ${theme.palette.secondary.light}`
            : `1px solid ${theme.palette.secondary.dark}`,
          paddingLeft: "48px",
        }}
        containerStyle={{
          borderRadius: "4px",
        }}
        inputProps={{
          name: fieldName,
          required: isRequired,
          disabled: disabled,
        }}
        buttonStyle={{
          border: "none",
          borderLeft: `1px solid ${
            isFocused
              ? theme.palette.secondary.light
              : theme.palette.secondary.dark
          }`,
          borderRight: `1px solid ${
            isFocused ? "none" : theme.palette.secondary.dark
          }`,
          borderTop: `1px solid ${
            isFocused
              ? theme.palette.secondary.light
              : theme.palette.secondary.dark
          }`,
          borderBottom: `1px solid ${
            isFocused
              ? theme.palette.secondary.light
              : theme.palette.secondary.dark
          }`,
          borderRadius: "4px 0 0 4px",
        }}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isError && (
        <FormHelperText
          sx={{
            fontSize: "0.75rem",
            marginTop: 1,
            position: "static",
          }}
        >
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomPhoneInput;
