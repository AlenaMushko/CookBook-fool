import { useGetAllDishesQuery } from "@apis/dishAPI";
import { AnimationWrap } from "@shared/index";
import { useAppStore } from "@stores/zustandStore";

const DishesPage = () => {
  const { dishCategory } = useAppStore();

  const { data: dishes } = useGetAllDishesQuery({
    limit: 3,
    offset: 1,
    categoryId: dishCategory || undefined,
    // search: "tomato",
  });

  console.log("----dishCategory----", dishCategory);
  console.log("---dishes---", dishes);

  return (
    <AnimationWrap>
      <h1>Category ID: {dishCategory}</h1>
    </AnimationWrap>
  );
};

export default DishesPage;
