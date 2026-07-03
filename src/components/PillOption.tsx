import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radius } from '../theme/layout';

type Props = { label: string; selected: boolean; onPress: () => void };

/** Full-width selectable pill (screen-time answers). */
export function PillOption({ label, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        selected ? styles.active : styles.inactive,
        pressed && { opacity: 0.9 },
      ]}
    >
      <Text style={[styles.text, { color: selected ? colors.white : colors.textPrimary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    height: 52,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  inactive: { backgroundColor: colors.card, borderColor: colors.cardBorder },
  active: {
    backgroundColor: colors.optionActiveBg,
    borderColor: colors.optionActiveBorder,
    shadowColor: colors.violet,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  text: { fontFamily: fonts.medium, fontSize: 15 },
});
