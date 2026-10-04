import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import type {
  CreatePaymentResult,
  PaymentStatusResult,
} from './types/payment.types';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() dto: CreatePaymentDto): Promise<CreatePaymentResult> {
    return this.paymentsService.createPayment(dto);
  }

  @Get(':id')
  getStatus(@Param('id') id: string): Promise<PaymentStatusResult> {
    return this.paymentsService.getPaymentStatus(id);
  }
}
