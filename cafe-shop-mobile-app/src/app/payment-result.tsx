import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "@/shared/ui";
import { theme } from "@/shared/config/theme";

export default function PaymentResultRoute() {
  const router = useRouter();
  const { status } = useLocalSearchParams<{ status?: string }>();
  const isSuccess = status === "success";

  return (
    <>
      <Stack.Screen options={{ title: isSuccess ? "Оплата" : "Ошибка" }} />
      <View style={styles.container}>
        <Text style={styles.icon}>{isSuccess ? "✅" : "❌"}</Text>
        <Text style={styles.title}>
          {isSuccess ? "Заказ оформлен" : "Оплата не прошла"}
        </Text>
        <Text style={styles.subtitle}>
          {isSuccess
            ? "Мы отправили заказ в обработку. Следите за статусом в личном кабинете."
            : "Попробуйте ещё раз или выберите другой способ оплаты."}
        </Text>
        <View style={styles.button}>
          <Button
            title="На главную"
            fullWidth
            onPress={() => router.replace("/")}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  icon: { fontSize: 64 },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.md,
    textAlign: "center",
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginTop: theme.spacing.sm,
  },
  button: { marginTop: theme.spacing.xl, width: "100%" },
});
