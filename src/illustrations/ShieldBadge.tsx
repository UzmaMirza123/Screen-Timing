import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

type Props = { active: boolean };

/** Violet shield tile with a springy green check badge and a breathing glow. */
export function ShieldBadge({ active }: Props) {
  const pulse = useRef(new Animated.Value(0)).current;
  const check = useRef(new Animated.Value(0)).current;
  const started = useRef(false);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  useEffect(() => {
    if (active && !started.current) {
      started.current = true;
      Animated.spring(check, { toValue: 1, delay: 350, useNativeDriver: true, speed: 6, bounciness: 14 }).start();
    }
  }, [active, check]);

  const glowScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] });
  const glowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.16] });
  const tileScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] });

  return (
    <View style={styles.box}>
      <Animated.View style={[styles.glow, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]} />
      <Animated.View style={[styles.tile, { transform: [{ scale: tileScale }] }]}>
        <Ionicons name="shield-checkmark" size={40} color={colors.violetLight} />
      </Animated.View>
      <Animated.View style={[styles.check, { transform: [{ scale: check }] }]}>
        <Ionicons name="checkmark" size={16} color={colors.white} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: 108, height: 100, alignItems: 'center', justifyContent: 'center' },
  glow: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.violet,
  },
  tile: {
    width: 86,
    height: 86,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#201A33',
    borderWidth: 1,
    borderColor: 'rgba(167,139,250,0.35)',
    shadowColor: colors.violet,
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 10,
  },
  check: {
    position: 'absolute',
    top: 4,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.bgMid,
  },
});
