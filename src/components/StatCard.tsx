import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radius } from '../theme/layout';

type Props = {
  value: string;
  label: string;
  valueColor: string;
  tintBg: string;
  tintBorder: string;
  icon?: keyof typeof Ionicons.glyphMap;
  valueSize?: number;
  style?: ViewStyle;
};

/** Tinted stat tile: coloured value (optionally with a leading icon) + muted label. */
export function StatCard({
  value,
  label,
  valueColor,
  tintBg,
  tintBorder,
  icon,
  valueSize = 22,
  style,
}: Props) {
  return (
    <View style={[styles.card, { backgroundColor: tintBg, borderColor: tintBorder }, style]}>
      <View style={styles.valueRow}>
        {icon ? <Ionicons name={icon} size={valueSize * 0.72} color={valueColor} style={styles.icon} /> : null}
        <Text style={[styles.value, { color: valueColor, fontSize: valueSize }]}>{value}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  valueRow: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 5 },
  value: {
    fontFamily: fonts.bold,
    letterSpacing: 0.2,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 11.5,
    color: colors.textSecondary,
    marginTop: 3,
    lineHeight: 15,
  },
});
