import { IParsedDish } from "@api/types";
import ManInfo from "@components/Dish/ManInfo";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

interface DishContentProps {
  selectedDish: IParsedDish;
}
const DishContent: React.FC<DishContentProps> = ({ selectedDish }) => {
  console.log("selectedDish", selectedDish);

  return (
    <Box>
      <Card sx={{ width: "100%" }}>
        <CardActionArea>
          <ManInfo selectedDish={selectedDish} />

          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Lizard
            </Typography>
            <Typography variant='body2' sx={{ color: "text.secondary" }}>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default DishContent;
