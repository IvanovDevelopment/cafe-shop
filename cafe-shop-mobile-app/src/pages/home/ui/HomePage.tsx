import { ScrollView, StyleSheet } from "react-native";
import { Greeting } from "@/widgets/greeting";
import { PromoBanner } from "@/widgets/promo-banner";
import { CategoryChips } from "@/widgets/category-chips";
import { ProductGrid } from "@/widgets/product-grid";
import type { Product, Category } from "@/entities/product";
import { theme } from "@/shared/config/theme";
import { useOpenProduct, useOpenCatalog } from "@/features";

interface HomePageProps {
  categories: Category[];
  products: Product[];
}

export function HomePage({ categories, products }: HomePageProps) {
  const openProduct = useOpenProduct();
  const openCatalog = useOpenCatalog();
  const popular = products.filter((p) => p.isPopular);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Greeting name="Виктор" />
      <PromoBanner
        title="Скидка 20%"
        subtitle="На все напитки до 12:00"
        imageUrl="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
        onPress={() => openCatalog()}
      />
      <CategoryChips categories={categories} onSelect={openCatalog} />
      <ProductGrid
        title="Популярное"
        products={popular}
        horizontal
        onProductPress={openProduct}
      />
      <ProductGrid
        title="Всё меню"
        products={products}
        onProductPress={openProduct}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { paddingBottom: theme.spacing.xl },
});
