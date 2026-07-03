import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radius } from '../theme/layout';
import { IconBadge } from './IconBadge';
import { Toggle } from './Toggle';

type Props = {
  title: string;
  time: string;
  value: boolean;
  onChange: (v: boolean) => void;
};

export function ScheduleRow({ title, time, value, onChange }: Props) {
  return (
    <View style={[styles.row, value && styles.rowActive]}>
      <IconBadge
        icon="time-outline"
        color={value ? colors.violetLight : colors.textMuted}
        tintBg={value ? colors.violetTintBg : colors.iconWell}
        tintBorder={value ? colors.violetTintBorder : colors.cardBorder}
        rounded={11}
        size={38}
        iconSize={18}
      />
      <View style={styles.text}>
        <Text style={[styles.title, !value && styles.dim]}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <Toggle value={value} onValueChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: 12,
    paddingHorizontal: 13,
  },
  rowActive: { borderColor: colors.violetTintBorder },
  text: { flex: 1, marginLeft: 13 },
  title: { fontFamily: fonts.semibold, fontSize: 14.5, color: colors.textPrimary },
  dim: { color: colors.textSecondary },
  time: { fontFamily: fonts.regular, fontSize: 12, color: colors.textSecondary, marginTop: 1 },
});
