export default () => ({
  yookassa: {
    shopId: process.env.YOOKASSA_SHOP_ID,
    secretKey: process.env.YOOKASSA_SECRET_KEY,
    apiUrl: process.env.YOOKASSA_API_URL ?? 'https://api.yookassa.ru/v3',
  },
  port: parseInt(process.env.PORT ?? '3000', 10),
});
