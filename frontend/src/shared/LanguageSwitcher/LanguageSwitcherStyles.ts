import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

export const LanguageSwitch = styled(Switch)(({ theme }) => ({
  width: 52,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    top: "50%",
    transform: "translate(6px, -50%)",
    position: "absolute",
    "&.Mui-checked": {
      color: theme.palette.primary.contrastText,
      transform: "translate(22px, -50%)",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.secondary.light,
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.primary.dark,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: theme.palette.primary.contrastText,
    position: "relative",
    "&::before": {
      content: "attr(data-lang)",
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2,
    backgroundColor: theme.palette.primary.light,
    opacity: 1,
    position: "relative",
  },
}));
