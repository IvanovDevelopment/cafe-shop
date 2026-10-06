import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "@/entities/cart";
import { useCheckout } from "@/features";
import { Button } from "@/shared/ui";
import { theme } from "@/shared/config/theme";

export function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice } = useCart();
  const { isProcessing, createOrderAndPay } = useCheckout();
  const [address, setAddress] = useState("");

  const handleSubmit = async () => {
    if (!address.trim()) {
      Alert.alert("Ошибка", "Укажите адрес доставки");
      return;
    }

    try {
      await createOrderAndPay(address);
      router.replace("/payment-result?status=success");
    } catch (e) {
      router.replace("/payment-result?status=error");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Адрес доставки</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="ул. Пушкина, дом 1, кв. 1"
          placeholderTextColor={theme.colors.textMuted}
          multiline
        />

        <Text style={styles.sectionTitle}>Ваш заказ</Text>
        {items.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item.product.name} × {item.quantity}
            </Text>
            <Text style={styles.itemPrice}>
              {item.totalPrice * item.quantity} ₽
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Итого</Text>
          <Text style={styles.totalPrice}>{totalPrice} ₽</Text>
        </View>
        <Button
          title={isProcessing ? "Обработка..." : "Оплатить"}
          fullWidth
          loading={isProcessing}
          disabled={isProcessing}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.md },
  sectionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
    minHeight: 80,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  itemName: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
  },
  itemPrice: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textPrimary,
  },
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
