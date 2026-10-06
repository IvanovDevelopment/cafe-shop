export type OrderStatus = "pending" | "paid" | "canceled";

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  address: string;
  status: OrderStatus;
  paymentId?: string;
  createdAt: string;
}

export interface CreateOrderPayload {
  address: string;
  totalPrice: number;
  items: OrderItem[];
}

export interface CreatePaymentPayload {
  amount: number;
  orderId: string;
  description?: string;
}

export interface CreatePaymentResponse {
  paymentId: string;
  status: "pending" | "succeeded" | "canceled";
  confirmationUrl: string;
}
