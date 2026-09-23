import { Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '@/shared/config/theme';

interface IconButtonProps {
  icon: string;
  onPress: () => void;
  badge?: number;
  size?: number;
}

export function IconButton({ icon, onPress, badge, size = 24 }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={[styles.icon, { fontSize: size }]}>{icon}</Text>
      {badge !== undefined && badge > 0 && (
        <Text style={styles.badge}>{badge}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: theme.spacing.sm,
    position: 'relative',
  },
  pressed: {
    opacity: 0.6,
  },
  icon: {
    lineHeight: 28,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: theme.colors.error,
    color: theme.colors.textInverse,
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
    borderRadius: theme.radius.full,
    minWidth: 16,
    height: 16,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 4,
    overflow: 'hidden',
  },
});