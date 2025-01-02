import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import React from "react";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='custom-modal-title'
      aria-describedby='custom-modal-description'
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: 600, md: 900 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          position: "relative",
        }}
      >
        {title ? (
          <Typography
            variant='h4'
            component='h2'
            sx={{ mb: 2, textAlign: "center" }}
          >
            {title}
          </Typography>
        ) : null}

        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box id='custom-modal-description'>{children}</Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
