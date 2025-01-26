import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1060,
      lg: 1320,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
    h3: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
      color: "#2E3B55",
    },
    h4: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 500,
      color: "#2E3B55",
    },
    h2: {
      fontFamily: "'Montserrat', serif",
      fontWeight: 600,
      fontSize: 20,
      letterSpacing: 0.2,
      lineHeight: 2.5,
      color: "#2E3B55",
    },
    h5: {
      fontFamily: "'Montserrat', serif",
      fontWeight: 600,
      fontSize: 22,
      lineHeight: 1.2,
      color: "#F57C00",
    },
    h6: {
      fontFamily: "'Montserrat', serif",
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.2,
      color: "#2E3B55",
    },
  },
  palette: {
    primary: {
      main: "#FF9800",
      light: "#FFB74D",
      dark: "#F57C00",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#4CAF50",
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "#050835",
    },
    colors: {
      btnBgHover: "#388E3C",
      bgLight: "#FAFAFA",
      lightGreen: "#E8F5E9",
      lightBlue: "#BBDEFB",
      lightGray: "#BDBDBD",
      darkBlue: "#303F9F",
      blueBtn: "#3C5075",
      blueBtnHover: "#2E3B55",
      greenBtnBg: "#F3F9F3",
      greenBtnHoverBg: "#E0F0E0",
      greyText: "#2E2E2E",
    },
    shadow: {
      orange: "0px 4px 20px rgba(255, 152, 0, 0.4)",
      green: "2px 0 5px rgba(0,0,0,0.1)",
    },
    gradients: {
      green: "linear-gradient(to top, #4CAF50, #A5D6A7)",
      orange: "linear-gradient(to top, #FFB74D, #FFE0B2)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: "#FAFAFA",
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
            backgroundColor: "#388E3C",
            color: "#FFFFFF",
          },
          "&:active": {
            backgroundColor: "#2E7D32",
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
      variants: [
        {
          props: { variant: "greenButton" },
          style: {
            justifyContent: "flex-start",
            borderRadius: "8px",
            marginBottom: "12px",
            backgroundColor: "#E9F4E9",
            boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#D3E8D3",
              color: "#2E2E2E",
            },
            textTransform: "none",
            fontFamily: "Montserrat, Arial, sans-serif",
            color: "#2E2E2E",
            fontWeight: "700",
            fontSize: "18px",
          },
        },
      ],
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
      greenBtnBg?: string;
      greenBtnHoverBg?: string;
      greyText?: string;
      blueBtn?: string;
      blueBtnHover?: string;
    };
    shadow?: {
      orange: string;
      green: string;
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
      greenBtnBg?: string;
      greenBtnHoverBg?: string;
      greyText?: string;
      blueBtn?: string;
      blueBtnHover?: string;
    };
    shadow?: {
      orange: string;
      green: string;
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    greenButton: true;
  }
}

export default theme;
