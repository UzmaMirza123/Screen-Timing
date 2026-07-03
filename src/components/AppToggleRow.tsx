import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radius } from '../theme/layout';
import { BrandAppIcon, Brand } from './BrandAppIcon';
import { Toggle } from './Toggle';

type Props = {
  brand: Brand;
  name: string;
  category: string;
  value: boolean;
  onChange: (v: boolean) => void;
  iconBg?: string;
};

export function AppToggleRow({ brand, name, category, value, onChange, iconBg }: Props) {
  return (
    <View style={[styles.row, value && styles.rowActive]}>
      <BrandAppIcon brand={brand} size={42} bg={iconBg} />
      <View style={styles.text}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
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
  name: { fontFamily: fonts.semibold, fontSize: 15, color: colors.textPrimary },
  category: { fontFamily: fonts.regular, fontSize: 12, color: colors.textSecondary, marginTop: 1 },
});
