// models.ts
export type MenuItem = {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type CartItem = {
  id: string; // menu item id
  name: string;
  price: number;
  quantity: number;
  image: string;
};