export interface IDish {
  id: string;
  isConfident: boolean;
  title: string;
  subtitle?: string;
  image?: string;
  description: string;
  note?: string;
  preparationTime?: string;
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

export interface IParsedDish extends IDish {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  dishCategory: {
    id: string;
    name: string;
  };
}

export interface IDishListRes {
  data: IDish[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}

export interface IDishQuery {
  limit?: number;
  offset?: number;
  categoryId?: string;
  search?: string;
  my?: boolean;
}
