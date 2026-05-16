export type DeliveryStatus = "új" | "készül" | "átadva_futárnak" | "kézbesítve" | "mégsem";

export interface DeliveryOrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface DeliveryOrder {
  id: string;
  clientName: string;
  clientPhone: string;
  deliveryAddress: string;
  latitude?: number;
  longitude?: number;
  items: DeliveryOrderItem[];
  totalPrice: number;
  status: DeliveryStatus;
  acceptedByCourierId?: string;
  createdAt: string;
  estimatedDeliveryTime?: string;
  notes?: string;
  restaurantName: string;
  restaurantAddress: string;
}

export interface Courier {
  id: string;
  email: string;
  username: string; // Cég által generált
  profilePhotoUrl?: string;
  theme: "light" | "dark";
  language: "hu" | "en";
  phoneNumber?: string;
  status: "online" | "offline";
  totalDeliveries: number;
  rating: number;
}
