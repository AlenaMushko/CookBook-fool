import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useAppStore } from "@stores/zustandStore";
import React from "react";

export const Toast: React.FC = () => {
  const { toast, setToast } = useAppStore();

  const handleClose = () => {
    setToast({ open: false, message: "", type: "info" });
  };

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={1500}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={toast.type} sx={{ width: "100%" }}>
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

export const showToast = (message: string, type: AlertColor) => {
  useAppStore.getState().setToast({
    open: true,
    message,
    type,
  });
};
