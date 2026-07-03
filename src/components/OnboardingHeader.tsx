import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { spacing } from '../theme/layout';

type Props = {
  showLogo?: boolean;
  onSkip?: () => void;
};

export function OnboardingHeader({ showLogo = false, onSkip }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        {showLogo ? (
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Ionicons name="lock-closed" size={16} color={colors.violetLight} />
            </View>
            <Text style={styles.brand}>FocusLock AI</Text>
          </View>
        ) : null}
      </View>

      <Pressable onPress={onSkip} hitSlop={12} style={({ pressed }) => [pressed && styles.pressed]}>
        <Text style={styles.skip}>Skip</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: { flex: 1 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.violetTintBg,
    borderWidth: 1,
    borderColor: colors.violetTintBorder,
    marginRight: spacing.sm,
  },
  brand: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.textPrimary,
    letterSpacing: 0.2,
  },
  skip: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.textSecondary,
  },
  pressed: { opacity: 0.5 },
});
