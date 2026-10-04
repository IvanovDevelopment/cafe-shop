import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';

interface YookassaWebhookPayload {
  event: string;
  object: {
    id: string;
    status: string;
    paid: boolean;
    metadata?: { orderId?: string };
  };
}

@Controller('webhooks')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  constructor(private readonly ordersService: OrdersService) {}

  @Post('yookassa')
  @HttpCode(200)
  handleYookassaWebhook(@Body() payload: YookassaWebhookPayload) {
    const { event, object } = payload;
    this.logger.log(`Webhook: ${event} for payment ${object.id}`);

    const orderId = object.metadata?.orderId;

    if (event === 'payment.succeeded' && orderId) {
      this.ordersService.updateStatus(orderId, 'paid', object.id);
      this.logger.log(`Order ${orderId} marked as paid`);
    }

    if (event === 'payment.canceled' && orderId) {
      this.ordersService.updateStatus(orderId, 'canceled', object.id);
      this.logger.log(`Order ${orderId} marked as canceled`);
    }

    return { received: true };
  }
}
