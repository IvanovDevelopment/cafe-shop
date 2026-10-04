import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

export type OrderStatus = 'pending' | 'paid' | 'canceled';

export interface Order {
  id: string;
  items: Array<{ productId: string; quantity: number }>;
  totalPrice: number;
  address: string;
  status: OrderStatus;
  paymentId?: string;
  createdAt: string;
}

@Injectable()
export class OrdersService {
  private readonly orders = new Map<string, Order>();

  createOrder(dto: CreateOrderDto): Order {
    const order: Order = {
      id: `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      items: dto.items,
      totalPrice: dto.totalPrice,
      address: dto.address,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    this.orders.set(order.id, order);
    return order;
  }

  getOrder(id: string): Order {
    const order = this.orders.get(id);
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return order;
  }

  updateStatus(id: string, status: OrderStatus, paymentId?: string): Order {
    const order = this.getOrder(id);
    order.status = status;
    if (paymentId) order.paymentId = paymentId;
    this.orders.set(id, order);
    return order;
  }

  getAll(): Order[] {
    return Array.from(this.orders.values());
  }
}
