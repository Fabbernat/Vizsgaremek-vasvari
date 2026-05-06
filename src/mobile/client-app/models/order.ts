export interface Order {
    id: string;
    restaurant_id: string;
    user_id: string;
    ordered_at: string;
    delivered: boolean;
    status: string;
}