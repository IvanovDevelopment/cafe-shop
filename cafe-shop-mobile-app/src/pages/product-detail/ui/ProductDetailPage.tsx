import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { Product, ProductSize } from "@/entities/product";
import { Button } from "@/shared/ui";
import { theme } from "@/shared/config/theme";
import { useAddToCart } from "@/features";

interface ProductDetailPageProps {
  product: Product | null;
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(
    product?.availableSizes?.[0],
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const addToCart = useAddToCart();

  if (!product) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Товар не найден</Text>
      </View>
    );
  }

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const addonsTotal = (product.addons ?? [])
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const total = product.price + addonsTotal;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <View style={styles.body}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>

          {product.availableSizes && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Размер</Text>
              <View style={styles.row}>
                {product.availableSizes.map((size) => (
                  <Pressable
                    key={size}
                    onPress={() => setSelectedSize(size)}
                    style={[
                      styles.sizeChip,
                      selectedSize === size && styles.sizeChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        selectedSize === size && styles.sizeTextActive,
                      ]}
                    >
                      {size}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {product.addons && product.addons.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Добавки</Text>
              {product.addons.map((addon) => {
                const active = selectedAddons.includes(addon.id);
                return (
                  <Pressable
                    key={addon.id}
                    onPress={() => toggleAddon(addon.id)}
                    style={styles.addonRow}
                  >
                    <View
                      style={[styles.checkbox, active && styles.checkboxActive]}
                    >
                      {active && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.addonName}>{addon.name}</Text>
                    <Text style={styles.addonPrice}>+{addon.price} ₽</Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Итого</Text>
          <Text style={styles.totalPrice}>{total} ₽</Text>
        </View>
        <Button
          title="В корзину"
          onPress={() => {
            addToCart({
              product,
              quantity: 1,
              size: selectedSize,
              addonIds: selectedAddons,
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { paddingBottom: theme.spacing.xl },
  image: {
    width: "100%",
    height: 260,
    backgroundColor: theme.colors.surface,
  },
  body: { padding: theme.spacing.md },
  name: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    lineHeight: 22,
  },
  section: { marginTop: theme.spacing.lg },
  sectionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  row: { flexDirection: "row", gap: theme.spacing.sm },
  sizeChip: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
  },
  sizeChipActive: { backgroundColor: theme.colors.primary },
  sizeText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textPrimary,
  },
  sizeTextActive: { color: theme.colors.textInverse },
  addonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.sm,
  },
  checkboxActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkmark: {
    color: theme.colors.textInverse,
    fontSize: 14,
    fontWeight: theme.fontWeight.bold,
  },
  addonName: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
  },
  addonPrice: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  totalLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  totalPrice: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
});
