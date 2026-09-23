import { View, Text, StyleSheet } from "react-native";
import { theme } from "@/shared/config/theme";

interface GreetingProps {
  name?: string;
}

export function Greeting({ name }: GreetingProps) {
  const hour = new Date().getHours();
  const timeOfDay =
    hour < 12 ? "Доброе утро" : hour < 18 ? "Добрый день" : "Добрый вечер";

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        {timeOfDay}
        {name ? `, ${name}` : ""}!
      </Text>
      <Text style={styles.subtitle}>Что будем сегодня?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  greeting: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
});
