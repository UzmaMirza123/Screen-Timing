import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radius, spacing } from '../theme/layout';
import { IconBadge } from './IconBadge';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconTintBg: string;
  iconTintBorder?: string;
  iconRounded?: number;
  title: string;
  subtitle?: string;
};

/** A dark card row: tinted icon well + title (+ optional subtitle). */
export function FeatureRow({
  icon,
  iconColor,
  iconTintBg,
  iconTintBorder,
  iconRounded = 12,
  title,
  subtitle,
}: Props) {
  return (
    <View style={styles.card}>
      <IconBadge
        icon={icon}
        color={iconColor}
        tintBg={iconTintBg}
        tintBorder={iconTintBorder}
        rounded={iconRounded}
        size={42}
        iconSize={19}
      />
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  text: { flex: 1, marginLeft: 14 },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 14.5,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.textSecondary,
    lineHeight: 17,
    marginTop: 2,
  },
});
