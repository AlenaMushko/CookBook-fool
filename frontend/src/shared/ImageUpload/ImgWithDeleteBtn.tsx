import CONFIG from "@config/config";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, CardMedia, IconButton } from "@mui/material";
import React from "react";

interface ImgWithDeleteBtnProps {
  handleRemoveImage: () => void;
  userAvatar: string;
}

const ImgWithDeleteBtn: React.FC<ImgWithDeleteBtnProps> = ({
  handleRemoveImage,
  userAvatar,
}) => {
  const avatar = `${CONFIG.AWS_S3_ENDPOINT}/${CONFIG.AWS_S3_BUCKET_NAME}/${userAvatar}`;

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <CardMedia
        component='img'
        image={avatar}
        alt='Uploaded Image'
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <IconButton
        aria-label='Remove image'
        onClick={handleRemoveImage}
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default ImgWithDeleteBtn;
