import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { randomUUID } from 'crypto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import type {
  YookassaPayment,
  CreatePaymentResult,
  PaymentStatusResult,
} from './types/payment.types';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly shopId: string;
  private readonly secretKey: string;
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.shopId = this.configService.getOrThrow<string>('yookassa.shopId');
    this.secretKey =
      this.configService.getOrThrow<string>('yookassa.secretKey');
    this.apiUrl = this.configService.getOrThrow<string>('yookassa.apiUrl');
  }

  async createPayment(dto: CreatePaymentDto): Promise<CreatePaymentResult> {
    const idempotenceKey = randomUUID();
    const auth = Buffer.from(`${this.shopId}:${this.secretKey}`).toString(
      'base64',
    );

    try {
      const response = await firstValueFrom(
        this.httpService.post<YookassaPayment>(
          `${this.apiUrl}/payments`,
          {
            amount: {
              value: dto.amount.toFixed(2),
              currency: 'RUB',
            },
            capture: true,
            confirmation: {
              type: 'redirect',
              return_url: 'cafe-shop://payment-result',
            },
            description: dto.description ?? `Заказ ${dto.orderId ?? ''}`.trim(),
            metadata: dto.orderId ? { orderId: dto.orderId } : undefined,
          },
          {
            headers: {
              Authorization: `Basic ${auth}`,
              'Idempotence-Key': idempotenceKey,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      const payment = response.data;
      this.logger.log(`Payment created: ${payment.id}`);

      if (!payment.confirmation?.confirmation_url) {
        throw new BadRequestException(
          'Yookassa did not return confirmation_url',
        );
      }

      return {
        paymentId: payment.id,
        status: payment.status,
        confirmationUrl: payment.confirmation.confirmation_url,
      };
    } catch (error) {
      this.logger.error('Failed to create payment', error);
      throw error;
    }
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatusResult> {
    const auth = Buffer.from(`${this.shopId}:${this.secretKey}`).toString(
      'base64',
    );

    const response = await firstValueFrom(
      this.httpService.get<YookassaPayment>(
        `${this.apiUrl}/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        },
      ),
    );

    const payment = response.data;

    return {
      paymentId: payment.id,
      status: payment.status,
      paid: payment.paid,
    };
  }
}
