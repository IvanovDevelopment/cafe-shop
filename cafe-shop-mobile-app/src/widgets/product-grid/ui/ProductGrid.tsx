import { View, Text, FlatList, StyleSheet } from "react-native";
import { Product, ProductCard } from "@/entities/product";
import { theme } from "@/shared/config/theme";

interface ProductGridProps {
  title: string;
  products: Product[];
  horizontal?: boolean;
  onProductPress?: (product: Product) => void;
}

export function ProductGrid({
  title,
  products,
  horizontal,
  onProductPress,
}: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {horizontal ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={onProductPress} />
          )}
        />
      ) : (
        <View style={styles.grid}>
          {products.map((item) => (
            <View key={item.id} style={styles.gridItem}>
              <ProductCard product={item} onPress={onProductPress} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  horizontalList: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
  },
  gridItem: {
    width: "47%",
  },
});
