import { useState, useMemo } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Product, Category, ProductCard } from "@/entities/product";
import { CategoryChips } from "@/widgets/category-chips";
import { theme } from "@/shared/config/theme";

interface CatalogPageProps {
  categories: Category[];
  products: Product[];
  initialCategoryId?: string;
  onProductPress?: (product: Product) => void;
}

export function CatalogPage({
  categories,
  products,
  initialCategoryId,
  onProductPress,
}: CatalogPageProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(
    initialCategoryId,
  );

  const filteredProducts = useMemo(() => {
    if (!activeCategoryId) return products;
    return products.filter((p) => p.categoryId === activeCategoryId);
  }, [products, activeCategoryId]);

  return (
    <View style={styles.container}>
      <View style={styles.chipsWrapper}>
        <CategoryChips
          categories={categories}
          activeId={activeCategoryId}
          onSelect={(cat) =>
            setActiveCategoryId((prev) =>
              prev === cat.id ? undefined : cat.id,
            )
          }
        />
      </View>

      {filteredProducts.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>В этой категории пока ничего нет</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.cell}>
              <ProductCard product={item} onPress={onProductPress} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  chipsWrapper: {
    paddingVertical: theme.spacing.md,
  },
  list: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  row: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  cell: {
    flex: 1,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.md,
  },
});
