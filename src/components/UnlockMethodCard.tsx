import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radius } from '../theme/layout';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sub: string;
  active: boolean;
  onPress: () => void;
};

export function UnlockMethodCard({ icon, label, sub, active, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        active ? styles.cardActive : styles.cardInactive,
        pressed && { opacity: 0.9 },
      ]}
    >
      <View style={[styles.iconWell, active && styles.iconWellActive]}>
        <Ionicons name={icon} size={22} color={active ? colors.violetLight : colors.textMuted} />
      </View>
      <Text style={[styles.label, { color: active ? colors.textPrimary : colors.textSecondary }]}>{label}</Text>
      <Text style={styles.sub}>{sub}</Text>
      <View style={[styles.bar, { backgroundColor: active ? colors.violet : colors.cardBorder }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  cardInactive: { backgroundColor: colors.card, borderColor: colors.cardBorder },
  cardActive: { backgroundColor: colors.violetTintBg, borderColor: colors.optionActiveBorder },
  iconWell: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.iconWell,
    marginBottom: 10,
  },
  iconWellActive: { backgroundColor: colors.violetTintBg, borderWidth: 1, borderColor: colors.violetTintBorder },
  label: { fontFamily: fonts.semibold, fontSize: 13.5 },
  sub: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, marginTop: 2, textAlign: 'center' },
  bar: { width: 26, height: 3, borderRadius: 2, marginTop: 10 },
});
