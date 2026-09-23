import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { theme } from "@/shared/config/theme";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  onPress?: () => void;
}

export function PromoBanner({
  title,
  subtitle,
  imageUrl,
  onPress,
}: PromoBannerProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.cta}>
            <Text style={styles.ctaText}>Заказать</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    height: 180,
    justifyContent: "flex-end",
  },
  imageRadius: {
    borderRadius: theme.radius.lg,
  },
  overlay: {
    padding: theme.spacing.md,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  title: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
  },
  subtitle: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.xs,
    opacity: 0.9,
  },
  cta: {
    alignSelf: "flex-start",
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.xs + 2,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.full,
  },
  ctaText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
  },
});
