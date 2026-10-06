import { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { useCart } from "@/entities/cart";
import { ordersApi } from "@/entities/order";
import type { Order, CreatePaymentResponse } from "@/entities/order";

interface UseCheckoutResult {
  isProcessing: boolean;
  error: string | null;
  createOrderAndPay: (address: string) => Promise<void>;
  lastOrder: Order | null;
}

export function useCheckout(): UseCheckoutResult {
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const createOrderAndPay = async (address: string) => {
    setIsProcessing(true);
    setError(null);

    try {
      // 1. Создаём заказ на сервере
      const order = await ordersApi.createOrder({
        address,
        totalPrice,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      });

      setLastOrder(order);

      // 2. Создаём платёж в ЮKassa
      const payment: CreatePaymentResponse = await ordersApi.createPayment({
        amount: totalPrice,
        orderId: order.id,
        description: `Заказ ${order.id}`,
      });

      // 3. Открываем страницу оплаты в системном браузере
      await WebBrowser.openBrowserAsync(payment.confirmationUrl, {
        dismissButtonStyle: "close",
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
      });

      // 4. После возврата очищаем корзину
      clearCart();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Неизвестная ошибка";
      setError(message);
      throw e;
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing, error, createOrderAndPay, lastOrder };
}
