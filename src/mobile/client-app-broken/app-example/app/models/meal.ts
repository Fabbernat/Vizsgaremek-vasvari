export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | undefined;
  restaurant_id: number;
}