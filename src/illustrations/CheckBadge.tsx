import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

type Props = { icon: keyof typeof Ionicons.glyphMap; active: boolean };

/** Violet rounded tile holding an icon, with a springy green check + breathing glow. */
export function CheckBadge({ icon, active }: Props) {
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
      Animated.spring(check, { toValue: 1, delay: 300, useNativeDriver: true, speed: 6, bounciness: 14 }).start();
    }
  }, [active, check]);

  const glowScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.22] });
  const glowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.36, 0.14] });
  const tileScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] });

  return (
    <View style={styles.box}>
      <Animated.View style={[styles.glow, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]} />
      <Animated.View style={[styles.tile, { transform: [{ scale: tileScale }] }]}>
        <Ionicons name={icon} size={38} color={colors.violetLight} />
      </Animated.View>
      <Animated.View style={[styles.check, { transform: [{ scale: check }] }]}>
        <Ionicons name="checkmark" size={15} color={colors.white} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: 104, height: 96, alignItems: 'center', justifyContent: 'center' },
  glow: { position: 'absolute', width: 104, height: 104, borderRadius: 52, backgroundColor: colors.violet },
  tile: {
    width: 82,
    height: 82,
    borderRadius: 25,
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
    top: 2,
    right: 10,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.bgMid,
  },
});
