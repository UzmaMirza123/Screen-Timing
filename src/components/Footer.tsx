import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

export function Footer({ text = 'Free to start · No credit card needed' }: { text?: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  text: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.textMuted,
    letterSpacing: 0.2,
  },
});
