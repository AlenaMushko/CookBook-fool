import { IDish } from "@api/types";
import DishItem from "@components/Dish/DishItem";
import { Box, Card, CardContent, Pagination, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import theme from "../../../theme";

interface DishListProps {
  dishList: IDish[];
  dishMeta: {
    limit: number;
    offset: number;
    total: number;
  } | null;
  dishCategory: { id: string; name: string };
  onPageChange: (page: number) => void;
}

const DishList: React.FC<DishListProps> = ({
  dishList,
  dishMeta,
  dishCategory,
  onPageChange,
}) => {
  const { t } = useTranslation();

  const { limit, offset, total } = dishMeta || {
    limit: 0,
    offset: 0,
    total: 0,
  };
  const currentPage = Math.floor(offset / limit) + 1;
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Box
      sx={{
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {!dishList?.length ? (
        <Card
          sx={{
            marginTop: "5vh",
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
              {t("dish.noDishesFound")}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <Typography
            variant='h2'
            component='h2'
            sx={{ color: theme.palette.primary.dark, fontSize: "2rem" }}
          >
            {dishCategory.name}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: 2,
              justifyContent: "center",
              gridTemplateColumns: {
                xs: "repeat(1, minmax(250px, 1fr))",
                sm: "repeat(2, minmax(250px, 1fr))",
                md: "repeat(3, minmax(250px, 1fr))",
                lg: "repeat(4, minmax(250px, 1fr))",
              },
            }}
          >
            {dishList.map((dish) => (
              <DishItem key={dish.id} dishCategory={dishCategory} dish={dish} />
            ))}
          </Box>
          {total > limit && (
            <Pagination
              count={Math.ceil(total / limit)}
              page={currentPage}
              onChange={handlePageChange}
              shape='rounded'
              sx={{ marginTop: "16px" }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default DishList;
