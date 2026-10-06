import { API_URL } from "@/shared/config/api";
import type {
  Order,
  CreateOrderPayload,
  CreatePaymentPayload,
  CreatePaymentResponse,
} from "../model/types";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API error ${response.status}: ${errorBody}`);
  }

  return response.json() as Promise<T>;
}

export const ordersApi = {
  createOrder(payload: CreateOrderPayload): Promise<Order> {
    return request<Order>("/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getOrder(id: string): Promise<Order> {
    return request<Order>(`/orders/${id}`);
  },

  createPayment(payload: CreatePaymentPayload): Promise<CreatePaymentResponse> {
    return request<CreatePaymentResponse>("/payments", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
