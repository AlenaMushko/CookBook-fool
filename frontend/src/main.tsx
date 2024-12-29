import "./index.css";

import { store } from "@api/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import theme from "../theme";
import App from "./App";
import i18n from "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <CssBaseline />
          <App />
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
