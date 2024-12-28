import { AnimationWrap } from "@shared/index";
import { useParams } from "react-router-dom";

const DishesPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <AnimationWrap>
      <h1>Category ID: {id}</h1>
    </AnimationWrap>
  );
};

export default DishesPage;
