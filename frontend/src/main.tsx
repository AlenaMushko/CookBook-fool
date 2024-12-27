import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import theme from "../theme.ts";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>  </StrictMode>,
)
