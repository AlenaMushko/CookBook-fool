import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface NoFoundDataProps {
  text: string;
}

const NoFoundData: React.FC<NoFoundDataProps> = ({ text }) => {
  return (
    <Box
      sx={{
        marginTop: "5vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          minWidth: 200,
          maxWidth: 520,
        }}
      >
        <CardContent>
          <Typography
            variant='h2'
            component='h2'
            sx={{ color: "text.secondary" }}
          >
            {text}
            {/*{t("dish.noDishes")}*/}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
export default NoFoundData;
