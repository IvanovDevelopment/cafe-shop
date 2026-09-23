import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Product } from "../model/types";
import { theme } from "@/shared/config/theme";

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() => onPress?.(product)}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <Text style={styles.price}>{product.price} ₽</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    width: 160,
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    width: "100%",
    height: 120,
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: theme.spacing.sm,
  },
  name: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  description: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    lineHeight: 16,
  },
  price: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    marginTop: theme.spacing.sm,
  },
});
