import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { FormikProps } from "formik";
import React from "react";

import theme from "../../theme";

export interface CustomInputProps {
  formik: FormikProps<any>;
  isInvalid: boolean | undefined;
  name: string;
  helpText?: string;
  type: string;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  h?: string | number;
  fontWeight?: number | string;
  fontSize?: string;
  maxLength?: number;
  currencyIcon?: string;
  onHandleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: number | string;
  pattern?: string;
  background?: string;
  formErrorPosition?: "absolute" | "relative" | "static";
  password?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  show?: boolean;
  mb?: number;
}

const CustomInput: React.FC<CustomInputProps> = ({
  formik,
  isInvalid,
  name,
  helpText,
  type,
  label,
  placeholder = "",
  isRequired,
  h,
  fontWeight = 700,
  fontSize = "1rem",
  maxLength = 60,
  onHandleChange,
  onHandleBlur,
  value,
  pattern,
  background = "inherit",
  currencyIcon,
  password = false,
  setShow,
  show,
  formErrorPosition,
  mb = 0,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (!pattern || newValue.match(pattern) || newValue === "") {
      if (onHandleChange) {
        onHandleChange(e);
      } else {
        formik.setFieldValue(name, newValue);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onHandleBlur) {
      onHandleBlur(e);
    } else {
      formik.handleBlur(e);
    }
  };

  return (
    <FormControl
      fullWidth
      variant='outlined'
      error={isInvalid}
      required={isRequired}
      sx={{
        position: "relative",
        background,
        mb: `${mb}px`,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderWidth: "1px",
            borderColor: isInvalid ? "red" : theme.palette.secondary.dark,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.secondary.light,
          },
          "&:hover fieldset": {
            borderColor: isInvalid ? "red" : theme.palette.secondary.light,
          },
        },
      }}
    >
      {label && (
        <InputLabel
          htmlFor={name}
          sx={{
            fontWeight,
            fontSize,
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
      <OutlinedInput
        id={name}
        name={name}
        type={password && setShow ? (show ? "text" : "password") : type}
        value={value !== undefined ? value : formik.values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        inputProps={{ maxLength }}
        startAdornment={
          currencyIcon && (
            <InputAdornment position='start'>{currencyIcon}</InputAdornment>
          )
        }
        endAdornment={
          password &&
          setShow && (
            <InputAdornment position='end'>
              <IconButton
                onClick={() => setShow(!show)}
                edge='end'
                aria-label='toggle password visibility'
              >
                {!show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
        sx={{
          height: h,
          fontWeight: "normal",
          fontSize: "0.875rem",
        }}
      />
      {!isInvalid ? (
        helpText && (
          <FormHelperText sx={{ fontSize: "0.75rem", marginTop: 1 }}>
            {helpText}
          </FormHelperText>
        )
      ) : (
        <FormHelperText
          sx={{
            fontSize: "0.75rem",
            marginTop: 1,
            position: formErrorPosition || "static",
          }}
        >
          {isInvalid ? (formik.errors[name] as string) : helpText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomInput;
