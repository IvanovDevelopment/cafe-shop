import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useCart, CartItemRow } from "@/entities/cart";
import { Button } from "@/shared/ui";
import { theme } from "@/shared/config/theme";

export function CartPage() {
  const router = useRouter();
  const { items, totalPrice, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Корзина пуста</Text>
        <Text style={styles.emptySubtitle}>
          Добавьте товары из меню, чтобы оформить заказ
        </Text>
        <View style={styles.emptyButton}>
          <Button title="В меню" onPress={() => router.push("/catalog")} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            onIncrease={(id) => {
              const target = items.find((i) => i.id === id);
              if (target) updateQuantity(id, target.quantity + 1);
            }}
            onDecrease={(id) => {
              const target = items.find((i) => i.id === id);
              if (target) updateQuantity(id, target.quantity - 1);
            }}
            onRemove={removeItem}
          />
        )}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Итого</Text>
          <Text style={styles.totalPrice}>{totalPrice} ₽</Text>
        </View>
        <Button
          title="Оформить заказ"
          fullWidth
          onPress={() => router.push("/checkout")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  list: { paddingBottom: theme.spacing.md },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  emptyIcon: { fontSize: 64 },
  emptyTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.md,
  },
  emptySubtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginTop: theme.spacing.sm,
  },
  emptyButton: { marginTop: theme.spacing.lg },
  footer: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  totalLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  totalPrice: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
});
