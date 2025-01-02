import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand, Arial, sans-serif",
    h3: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
      color: "#050835",
    },
    h4: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 500,
      color: "#050835",
    },
  },
  palette: {
    primary: {
      main: "#F5EBFF",
      light: "#aab4be",
      dark: "#FF7043",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#388E3C",
      light: "#65C466",
      dark: "#0000003A",
      contrastText: "#050835",
    },
    colors: {
      btnBgHover: "#FF5722",
      bgLight: "#f9f9f9",
      lightGreen: "#DCF7DD",
      lightBlue: "#D6E2ED",
      lightGray: "#7e8e9e",
      darkBlue: "#597086",
    },
    shadow: {
      orange: "0px 4px 20px rgba(255, 112, 67, 0.4)",
    },
    gradients: {
      green: "linear-gradient(to bottom, #6fd6a9, #2ab8b9)",
      orange: "linear-gradient(to bottom, #fdf78c, #fda085)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: "bold",
          transition: "all 0.3s ease",
          fontSize: "1.2em",
          "&:hover": {
            backgroundColor: "#FF7043",
            color: "#FFFFFF",
          },
          "&:active": {
            backgroundColor: "#FF7043",
            color: "#FFFFFF",
          },
          "&:focus, &:focus-visible": {
            outline: "none",
          },
        },
        text: {
          border: "1px solid transparent",
          color: "#FFFFFF",

          "&:hover": {
            border: "1px solid transparent",
          },
          "&:active": {
            border: "1px solid transparent",
          },
        },
      },
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    gradients?: {
      green?: string;
      orange?: string;
    };
    colors?: {
      btnBgHover?: string;
      bgLight?: string;
      lightGreen?: string;
      lightGray?: string;
      darkBlue?: string;
      lightBlue?: string;
    };
    shadow?: {
      orange: string;
    };
  }
  interface PaletteOptions {
    gradients?: {
      green?: string;
      orange?: string;
    };
    colors?: {
      btnBgHover?: string;
      bgLight?: string;
      lightGreen?: string;
      lightGray?: string;
      darkBlue?: string;
      lightBlue?: string;
    };
    shadow?: {
      orange: string;
    };
  }
}

export default theme;
