import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "@/shared/ui/IconButton";
import { theme } from "@/shared/config/theme";

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  cartCount?: number;
  onBackPress?: () => void;
  onCartPress?: () => void;
}

export function AppHeader({
  title = "Cafe Shop",
  showBack = false,
  cartCount = 0,
  onBackPress,
  onCartPress,
}: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack && (
          <IconButton icon="←" onPress={onBackPress ?? (() => {})} />
        )}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.right}>
        <IconButton
          icon="🛒"
          onPress={onCartPress ?? (() => {})}
          badge={cartCount}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    flex: 1,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    flexShrink: 1,
  },
});
