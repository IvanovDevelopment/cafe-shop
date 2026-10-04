export type YookassaPaymentStatus =
  'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled';

export interface YookassaAmount {
  value: string;
  currency: string;
}

export interface YookassaConfirmation {
  type: string;
  confirmation_url: string;
}

export interface YookassaPayment {
  id: string;
  status: YookassaPaymentStatus;
  paid: boolean;
  amount: YookassaAmount;
  confirmation?: YookassaConfirmation;
  created_at: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface CreatePaymentResult {
  paymentId: string;
  status: YookassaPaymentStatus;
  confirmationUrl: string;
}

export interface PaymentStatusResult {
  paymentId: string;
  status: YookassaPaymentStatus;
  paid: boolean;
}
