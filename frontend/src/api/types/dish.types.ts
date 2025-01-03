export interface IDish {
  id: string;
  isConfident: boolean;
  title: string;
  subtitle?: string;
  image?: string;
  description: string;
  note?: string;
  preparationTime?: number;
  difficulty?: number;
  ingredient: {
    ingredientName: string;
    measure: {
      quantity: number;
      unit: string;
    };
  }[];
  userId: string;
  categoryId: string;
  likesCount: number;
}

export interface IDishListRes {
  data: IDish[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
