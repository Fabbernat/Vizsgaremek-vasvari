import './ModernStyle.css'
import type { Meal } from './MealView';

export type Restaurant = {
  restaurant: {
    id: number;
    name: string;
    description: string;
    meals: Meal[];
  }[]
};

export function RestaurantView({ restaurant }: { restaurant: any }) {
  return (
    <div>Restaurants</div>
  );
}