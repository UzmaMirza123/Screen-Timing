import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radius } from '../theme/layout';

type Props = { label: string; active?: boolean; onPress?: () => void };

/** Pill filter chip — violet when active, dark outlined when not. */
export function Chip({ label, active, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        active ? styles.active : styles.inactive,
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text style={[styles.text, active ? styles.textActive : styles.textInactive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    height: 34,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  active: { backgroundColor: colors.violet, borderColor: colors.violet },
  inactive: { backgroundColor: colors.card, borderColor: colors.cardBorder },
  text: { fontFamily: fonts.medium, fontSize: 13.5 },
  textActive: { color: colors.white },
  textInactive: { color: colors.textSecondary },
});
