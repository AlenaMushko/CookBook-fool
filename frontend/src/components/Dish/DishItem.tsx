import { IDish } from "@api/types";
import { useDeleteDishMutation } from "@apis/dishAPI";
import CONFIG from "@config/config";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import ConfirmationPopup from "@shared/ConfirmationPopup";
import React from "react";
import { useTranslation } from "react-i18next";

interface DishItemProps {
  dishCategory: { id: string; name: string };
  dish: IDish;
}

const DishItem: React.FC<DishItemProps> = ({ dishCategory, dish }) => {
  // console.log("----dishCategory----", dishCategory);
  // console.log("---dish---", dish);
  const { t } = useTranslation();

  const dishImg = dish?.image
    ? `${CONFIG.AWS_S3_ENDPOINT}/${CONFIG.AWS_S3_BUCKET_NAME}/${dish?.image}`
    : undefined;

  const [deleteDish] = useDeleteDishMutation();

  const [selectedDish, setSelectedDish] = React.useState<IDish | null>(null);

  const handleOpenDishPage = () => {
    console.log("Open dish page", selectedDish);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDeleteDish = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setAnchorEl(anchorEl ? null : e.currentTarget);
    setSelectedDish(dish);
  };

  const onDishDelete = async () => {
    if (selectedDish?.id) await deleteDish({ id: selectedDish.id, t });
    setSelectedDish(null);
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{ width: 250, cursor: "pointer", position: "relative" }}
      onClick={handleOpenDishPage}
    >
      <CardActions
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          padding: 1,
          borderRadius: "50%",
          backgroundColor: "#F57C0090",
          transition: "background-color 0.3s linear",
          "&:hover": {
            backgroundColor: "#F57C00",
          },
        }}
        onClick={(e) => handleDeleteDish(e)}
      >
        <DeleteForeverIcon
          sx={{
            color: "#2E3B55",
          }}
        />
      </CardActions>
      <CardMedia sx={{ height: 140 }} image={dishImg} title={dish?.title} />
      <CardContent
        sx={{ maxWidth: 345, cursor: "pointer", position: "relative" }}
      >
        <Tooltip title={t("dish.degreeDifficulty")} placement='left'>
          <span
            style={{
              position: "absolute",
              top: "4px",
              right: "4px",
            }}
          >
            <Rating
              size='small'
              name='half-rating-read'
              defaultValue={dish?.difficulty}
              precision={0.5}
              readOnly
            />
          </span>
        </Tooltip>
        <Typography gutterBottom variant='h5' component='div'>
          {dish?.title}
        </Typography>
        <Typography variant='body2' sx={{ color: "text.secondary" }}>
          {dish?.description}
        </Typography>
      </CardContent>

      <ConfirmationPopup
        isOpenModal={open}
        onClose={() => {
          setAnchorEl(null);
          setSelectedDish(null);
        }}
        onConfirmClick={onDishDelete}
        title={t("dish.delete")}
        message={`${t("dish.deleteDishMessage")} ${dish?.title}`}
      />
    </Card>
  );
};

export default DishItem;
