import { ScrollView, Text, Pressable, StyleSheet } from "react-native";
import { Category } from "@/entities/product";
import { theme } from "@/shared/config/theme";

interface CategoryChipsProps {
  categories: Category[];
  activeId?: string;
  onSelect?: (category: Category) => void;
}

export function CategoryChips({
  categories,
  activeId,
  onSelect,
}: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const isActive = category.id === activeId;
        return (
          <Pressable
            key={category.id}
            onPress={() => onSelect?.(category)}
            style={({ pressed }) => [
              styles.chip,
              isActive && styles.chipActive,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.icon}>{category.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {category.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
  },
  chipActive: {
    backgroundColor: theme.colors.primary,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    fontSize: 16,
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textPrimary,
  },
  labelActive: {
    color: theme.colors.textInverse,
  },
});
