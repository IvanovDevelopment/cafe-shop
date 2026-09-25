import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ добавьте импорт
import { AppHeader } from "@/widgets/app-header";
import { theme } from "@/shared/config/theme";
import { selectTotalCount, useCartStore } from "@/entities/cart";

export default function RootLayout() {
  const router = useRouter();
  const cartCount = useCartStore(selectTotalCount);

  return (
    // ✅ Оборачиваем всё в SafeAreaView с edges=["top"]
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={["top"]}
    >
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: theme.colors.background },
          header: ({ options, route }) => (
            <AppHeader
              title={options.title ?? "Cafe Shop"}
              showBack={router.canGoBack()}
              onBackPress={() => router.back()}
              cartCount={cartCount}
              onCartPress={() => router.push("/cart")}
            />
          ),
        }}
      >
        {/* Здесь ваши экраны, например: <Stack.Screen name="index" /> */}
      </Stack>
    </SafeAreaView>
  );
}
