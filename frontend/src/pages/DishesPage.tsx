import { IDishQuery } from "@api/types";
import { useGetAllDishesQuery } from "@apis/dishAPI";
import Filter from "@components/Dish/Filter";
import { Divider } from "@mui/material";
import { AnimationWrap } from "@shared/index";
import { useAppStore } from "@stores/zustandStore";
import { useState } from "react";

import DishList from "../components/Dish/DishList";
import NoCategory from "../components/Dish/NoCategory";

const DishesPage = () => {
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

      {dishCategory || searchDish ? (
        <DishList
          dishList={dishes?.data ?? []}
          dishMeta={dishes?.meta ?? null}
          dishCategory={dishCategory ?? { id: "", name: "" }}
          onPageChange={onPageChange}
        />
      ) : (
        <NoCategory />
      )}
    </AnimationWrap>
  );
};

export default DishesPage;
