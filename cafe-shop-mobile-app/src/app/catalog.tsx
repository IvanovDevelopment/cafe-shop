import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { CatalogPage } from "@/pages/catalog";
import { products, categories } from "@/shared/lib/mock-data";
import { useOpenProduct } from "@/features";

export default function CatalogRoute() {
  const openProduct = useOpenProduct();
  const { categoryId } = useLocalSearchParams<{ categoryId?: string }>();

  return (
    <>
      <Stack.Screen options={{ title: "Меню" }} />
      <CatalogPage
        categories={categories}
        products={products}
        initialCategoryId={categoryId}
        onProductPress={openProduct}
      />
    </>
  );
}
