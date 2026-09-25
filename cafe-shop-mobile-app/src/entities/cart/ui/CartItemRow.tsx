import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import type { CartItem } from "../model/types";
import { theme } from "@/shared/config/theme";

interface CartItemRowProps {
  item: CartItem;
  onIncrease?: (id: string) => void;
  onDecrease?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemRowProps) {
  const { product, quantity, size, addonIds, totalPrice } = item;

  const selectedAddons = (product.addons ?? []).filter((a) =>
    addonIds.includes(a.id),
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>

        {size && <Text style={styles.meta}>Размер: {size}</Text>}
        {selectedAddons.length > 0 && (
          <Text style={styles.meta}>
            Добавки: {selectedAddons.map((a) => a.name).join(", ")}
          </Text>
        )}

        <Text style={styles.price}>{totalPrice * quantity} ₽</Text>

        <View style={styles.controls}>
          <Pressable
            onPress={() => onDecrease?.(item.id)}
            style={styles.counterBtn}
          >
            <Text style={styles.counterText}>−</Text>
          </Pressable>
          <Text style={styles.quantity}>{quantity}</Text>
          <Pressable
            onPress={() => onIncrease?.(item.id)}
            style={styles.counterBtn}
          >
            <Text style={styles.counterText}>+</Text>
          </Pressable>

          <Pressable
            onPress={() => onRemove?.(item.id)}
            style={styles.removeBtn}
          >
            <Text style={styles.removeText}>Удалить</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
  },
  body: { flex: 1 },
  name: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  meta: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  price: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  counterBtn: {
    width: 28,
    height: 28,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  quantity: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textPrimary,
    minWidth: 24,
    textAlign: "center",
  },
  removeBtn: { marginLeft: "auto" },
  removeText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.error,
  },
});
