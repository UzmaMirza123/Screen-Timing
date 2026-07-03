import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radius } from '../theme/layout';
import { IconBadge } from './IconBadge';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  selected: boolean;
  onPress: () => void;
};

/** Occupation-style row: tinted icon + label + radio/check, highlights when selected. */
export function OptionRow({ icon, label, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        selected ? styles.rowActive : styles.rowInactive,
        pressed && { opacity: 0.9 },
      ]}
    >
      <IconBadge
        icon={icon}
        color={colors.violetLight}
        tintBg={colors.violetTintBg}
        tintBorder={colors.violetTintBorder}
        rounded={11}
        size={38}
        iconSize={18}
      />
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.radio, selected && styles.radioOn]}>
        {selected ? <Ionicons name="checkmark" size={14} color={colors.white} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 13,
  },
  rowInactive: { backgroundColor: colors.card, borderColor: colors.cardBorder },
  rowActive: { backgroundColor: colors.optionActiveBg, borderColor: colors.optionActiveBorder },
  label: { flex: 1, fontFamily: fonts.semibold, fontSize: 14.5, color: colors.textPrimary, marginLeft: 13 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { backgroundColor: colors.violet, borderColor: colors.violet },
});
