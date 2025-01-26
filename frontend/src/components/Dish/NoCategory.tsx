import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const NoCategory = () => {
  const { t } = useTranslation();

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
            {t("dish.noDishes")}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
export default NoCategory;
