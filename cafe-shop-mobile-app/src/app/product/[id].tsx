import { Stack, useLocalSearchParams } from "expo-router";
import { ProductDetailPage } from "@/pages/product-detail";
import { products } from "@/shared/lib/mock-data";

export default function ProductRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <>
        <Stack.Screen options={{ title: "Товар не найден" }} />
        <ProductDetailPage product={null} />
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: product.name }} />
      <ProductDetailPage product={product} />
    </>
  );
}
