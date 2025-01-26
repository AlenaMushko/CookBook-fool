import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { Switcher } from "./LanguageSwitcherStyles";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const [language, setLanguage] = React.useState<"EN" | "UK">(
    i18n.language === "uk" ? "UK" : "EN"
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = event.target.checked ? "UK" : "EN";
    setLanguage(newLanguage);

    i18n.changeLanguage(newLanguage === "UK" ? "uk" : "en");
  };

  return (
    <FormControlLabel
      control={
        <Switcher
          checked={language === "UK"}
          onChange={handleChange}
          data-lang={language}
          inputProps={{ "aria-label": "language switch" }}
        />
      }
      label={
        <Typography variant='body2' sx={{ fontWeight: "bold" }}>
          {language}
        </Typography>
      }
    />
  );
};

export default LanguageSwitcher;
