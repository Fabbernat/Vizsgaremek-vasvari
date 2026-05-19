export interface Order {
    id: string;
    producer_id: string;
    user_id: string;
    ordered_at: string;
    delivered: boolean;
    status: string;
}