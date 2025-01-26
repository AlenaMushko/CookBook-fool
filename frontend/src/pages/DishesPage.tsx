import { IDishQuery } from "@api/types";
import { useGetAllDishesQuery } from "@apis/dishAPI";
import DishCategoryTitle from "@components/Dishes/DishCategoryTitle";
import DishList from "@components/Dishes/DishList";
import Filter from "@components/Dishes/Filter";
import { Divider } from "@mui/material";
import { AnimationWrap, NoFoundData } from "@shared/index";
import { useAppStore } from "@stores/zustandStore";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const DishesPage = () => {
  const { t } = useTranslation();
  const { dishCategory } = useAppStore();

  const limit = 5;
  const [isMyDishes, setIsMyDishes] = useState<boolean>(true);
  const [searchDish, setSearchDish] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);

  const dishQuery: IDishQuery = {
    limit,
    offset,
    categoryId: dishCategory?.id || undefined,
    my: isMyDishes,
  };
  if (searchDish) {
    dishQuery.search = searchDish;
  }

  const { data: dishes } = useGetAllDishesQuery(dishQuery);

  const onPageChange = (page: number) => {
    setOffset((page - 1) * limit);
  };

  const handleCreateDish = () => {
    console.log("Create dish");
  };

  return (
    <AnimationWrap>
      <Filter
        setIsMyDishes={setIsMyDishes}
        setSearchDish={setSearchDish}
        isMyDishes={isMyDishes}
      />
      <Divider
        sx={{
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      />
      {dishCategory ? (
        <DishCategoryTitle
          categoryName={dishCategory?.name}
          handleCreateDish={handleCreateDish}
        />
      ) : null}

      {dishCategory || searchDish ? (
        <DishList
          dishList={dishes?.data ?? []}
          dishMeta={dishes?.meta ?? null}
          onPageChange={onPageChange}
        />
      ) : (
        <NoFoundData text={t("dish.noDishes")} />
      )}
    </AnimationWrap>
  );
};

export default DishesPage;
