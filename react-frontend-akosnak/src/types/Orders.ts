
export type Orders = {
    id: number;
    restaurantId: number;
    userId: number;
    date: string;
    payment: string;
    status?: 'pending' | 'completed' | 'cancelled';
}