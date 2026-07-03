import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  scrollX: Animated.Value;
  count: number;
  pageWidth: number;
};

/**
 * Progress dots. The active dot morphs into a wide violet pill as the pager
 * scrolls — the width / colour / opacity all interpolate off scrollX so the
 * transition tracks the swipe frame-for-frame.
 */
export function PagerDots({ scrollX, count, pageWidth }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, i) => {
        const inputRange = [(i - 1) * pageWidth, i * pageWidth, (i + 1) * pageWidth];
        const width = scrollX.interpolate({
          inputRange,
          outputRange: [7, 22, 7],
          extrapolate: 'clamp',
        });
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [colors.textFaint, colors.violet, colors.textFaint],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i}
            style={[styles.dot, { width, backgroundColor, opacity }]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  dot: {
    height: 7,
    borderRadius: 4,
    marginHorizontal: 3.5,
  },
});
