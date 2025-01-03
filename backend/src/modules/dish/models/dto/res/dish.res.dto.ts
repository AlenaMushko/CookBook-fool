export class IngredientResDto {
  ingredientName: string;

  measure: {
    quantity: number;
    unit: string;
  };
}

export class DishResDto {
  id: string;
  isConfident: boolean;
  title: string;
  subtitle?: string;
  image?: string;
  description: string;
  note?: string;
  preparationTime?: number;
  difficulty?: number;
  ingredient: IngredientResDto[];
  userId: string;
  categoryId: string;
  likesCount: number;
}

export class DishListResDto {
  data: DishResDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
