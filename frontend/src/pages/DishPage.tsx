import { AnimationWrap } from "@shared/index";
import { useParams } from "react-router-dom";

const DishPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <AnimationWrap>
      <h1>Dish by: {id}</h1>
    </AnimationWrap>
  );
};

export default DishPage;
