import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { screen } from '../theme/layout';

type Star = {
  left: number;
  top: number;
  size: number;
  base: number;
  group: number;
};

function buildStars(count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      left: Math.random() * screen.width,
      top: Math.random() * screen.height,
      size: Math.random() < 0.8 ? 1.6 : 2.6,
      base: 0.15 + Math.random() * 0.5,
      group: i % 3,
    });
  }
  return stars;
}

/**
 * Subtle twinkling starfield behind the hero art.
 * Three groups pulse on independent loops so the sky feels alive but cheap.
 */
export function Starfield({ count = 46 }: { count?: number }) {
  const stars = useMemo(() => buildStars(count), [count]);
  const groups = [useRef(new Animated.Value(0.4)).current, useRef(new Animated.Value(0.7)).current, useRef(new Animated.Value(0.5)).current];

  useEffect(() => {
    const durations = [2600, 3400, 4200];
    const loops = groups.map((v, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(v, {
            toValue: 1,
            duration: durations[i],
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(v, {
            toValue: 0.35,
            duration: durations[i],
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ),
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {stars.map((s, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            borderRadius: s.size,
            backgroundColor: colors.white,
            opacity: Animated.multiply(groups[s.group], s.base),
          }}
        />
      ))}
    </View>
  );
}
