export type Meals = {
    id?: number;
    name: string;
    description: string;
    price: number;
    restaurantId?: number;
    available?: number;
    status?: string;
}