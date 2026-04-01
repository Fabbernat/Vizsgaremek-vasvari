export type CourierOrderCard = {
  id: number;
  restaurantId: number;
  userId: number;
  orderedAt: string;
  customerName: string;
  customerAddress: string;
  itemCount: number;
  totalPrice: number;
};