import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { BrandAppIcon, Brand } from '../components/BrandAppIcon';

const BOX = 300;
const C = BOX / 2;
const ICON = 52;

type Placed = { brand: Brand; angle: number; r: number };

// Angles in degrees (0 = right, +clockwise). Matches the design layout.
const ICONS: Placed[] = [
  { brand: 'instagram', angle: -90, r: 120 }, // top
  { brand: 'music', angle: -32, r: 108 }, // upper-right
  { brand: 'x', angle: 34, r: 108 }, // lower-right
  { brand: 'youtube', angle: 90, r: 120 }, // bottom
  { brand: 'facebook', angle: 146, r: 108 }, // lower-left
  { brand: 'snapchat', angle: -148, r: 108 }, // upper-left
];

function polar(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: C + r * Math.cos(a) - ICON / 2, y: C + r * Math.sin(a) - ICON / 2 };
}

/**
 * Social app icons slowly revolving around a glowing central lock.
 * The icon layer rotates while each icon counter-rotates to stay upright,
 * so the constellation "orbits" without the glyphs tumbling.
 */
export function OrbitIllustration() {
  const spin = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinLoop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 26000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    spinLoop.start();
    floatLoop.start();
    pulseLoop.start();
    return () => {
      spinLoop.stop();
      floatLoop.stop();
      pulseLoop.stop();
    };
  }, [spin, float, pulse]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const counter = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-360deg'] });
  const lockScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] });
  const glowScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.22] });
  const glowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0.15] });

  return (
    <View style={styles.box}>
      {/* dashed orbit rings */}
      <Svg width={BOX} height={BOX} style={StyleSheet.absoluteFill}>
        <Circle cx={C} cy={C} r={62} stroke="rgba(255,255,255,0.08)" strokeWidth={1} strokeDasharray="2 7" fill="none" />
        <Circle cx={C} cy={C} r={108} stroke="rgba(255,255,255,0.09)" strokeWidth={1} strokeDasharray="2 7" fill="none" />
        <Circle cx={C} cy={C} r={132} stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeDasharray="2 8" fill="none" />
      </Svg>

      {/* revolving icon layer */}
      <Animated.View style={[styles.layer, { transform: [{ rotate }] }]}>
        {ICONS.map((it, i) => {
          const p = polar(it.angle, it.r);
          const bob = float.interpolate({
            inputRange: [0, 1],
            outputRange: i % 2 === 0 ? [-3.5, 3.5] : [3.5, -3.5],
          });
          return (
            <Animated.View
              key={it.brand}
              style={{
                position: 'absolute',
                left: p.x,
                top: p.y,
                transform: [{ rotate: counter }, { translateY: bob }],
              }}
            >
              <BrandAppIcon brand={it.brand} size={ICON} />
            </Animated.View>
          );
        })}
      </Animated.View>

      {/* central lock */}
      <View style={styles.centerWrap} pointerEvents="none">
        <Animated.View
          style={[styles.lockGlow, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]}
        />
        <Animated.View style={[styles.lockCore, { transform: [{ scale: lockScale }] }]}>
          <Ionicons name="lock-closed" size={30} color={colors.violetLight} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: BOX, height: BOX, alignItems: 'center', justifyContent: 'center' },
  layer: { position: 'absolute', width: BOX, height: BOX },
  centerWrap: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  lockGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.violet,
  },
  lockCore: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191231',
    borderWidth: 1,
    borderColor: 'rgba(167,139,250,0.45)',
    shadowColor: colors.violet,
    shadowOpacity: 0.7,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
});
