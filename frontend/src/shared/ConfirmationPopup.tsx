import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import theme from "../../theme";

interface IConfirmationPopup {
  title?: string;
  message?: string;
  secondaryMessage?: string;
  highlightedMessage?: string;
  isOpenModal: boolean;
  onClose: () => void;
  onConfirmClick: () => void;
  additionalText?: string;
}

const ConfirmationPopup: React.FC<IConfirmationPopup> = ({
  title,
  message,
  secondaryMessage,
  highlightedMessage,
  isOpenModal,
  onClose,
  onConfirmClick,
  additionalText,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpenModal} onClose={onClose} maxWidth='sm' fullWidth>
      {title && (
        <DialogTitle
          sx={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}
        >
          {title}
        </DialogTitle>
      )}
      <DialogContent>
        {(message || highlightedMessage) && (
          <Typography
            sx={{ fontSize: "1rem", textAlign: "center", marginBottom: "10px" }}
          >
            {message && <span>{message} </span>}
            {highlightedMessage && (
              <span style={{ fontWeight: "bold", color: "#1976d2" }}>
                {highlightedMessage}
              </span>
            )}
            {secondaryMessage ? <span> {secondaryMessage}</span> : "?"}
          </Typography>
        )}
        {additionalText && (
          <Typography
            sx={{
              fontSize: "0.875rem",
              color: "#d32f2f",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {additionalText}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
        <Button
          onClick={onClose}
          type='button'
          variant='contained'
          color='primary'
          fullWidth
          sx={{
            backgroundColor: theme.palette.secondary.light,
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
            },
          }}
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={onConfirmClick}
          type='button'
          variant='contained'
          color='primary'
          fullWidth
          sx={{
            backgroundColor: theme.palette.primary.light,
            "&:hover": {
              backgroundColor: theme.palette?.primary.dark,
            },
          }}
        >
          {t("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationPopup;
