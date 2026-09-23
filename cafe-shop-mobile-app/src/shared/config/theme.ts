export const colors = {
  // Основные
  primary: "#6F4E37", // тёмно-коричневый (кофе)
  primaryLight: "#A67B5B", // светлый оттенок
  primaryDark: "#4A3428", // тёмный оттенок

  // Фон
  background: "#FFFFFF",
  surface: "#F5F0EB", // карточки, поверхности
  accent: "#D4A574", // тёплый бежевый для баннера
  accentDark: "#B8895C",

  // Текст
  textPrimary: "#1A1A1A",
  textSecondary: "#666666",
  textMuted: "#999999",
  textInverse: "#FFFFFF",

  // Границы и состояния
  border: "#E5E5E5",
  success: "#4CAF50",
  error: "#E53935",
  warning: "#FFA726",

  // Служебные
  overlay: "rgba(0, 0, 0, 0.5)",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 9999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const fontWeight = {
  regular: "400",
  medium: "500",
  bold: "700",
} as const;

export const theme = {
  colors,
  spacing,
  radius,
  fontSize,
  fontWeight,
} as const;
