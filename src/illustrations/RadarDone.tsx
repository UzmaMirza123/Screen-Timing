import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { screen } from '../theme/layout';

const W = screen.width;
const H = 320;
const CX = W / 2;
const CY = 142;
const R = 76;

function polar(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

function arc(r: number, a1: number, a2: number) {
  const p1 = polar(a1, r);
  const p2 = polar(a2, r);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} 1 ${p2.x} ${p2.y}`;
}

const ARCS = [
  { color: colors.blue, a1: -125, a2: -55 }, // top
  { color: colors.pink, a1: -35, a2: 35 }, // right
  { color: colors.green, a1: 55, a2: 125 }, // bottom
  { color: colors.gold, a1: 145, a2: 215 }, // left
];

type Props = { active: boolean };

/** Radar-style summary: dashed rings, 4 coloured metric arcs, a central DONE dial. */
export function RadarDone({ active }: Props) {
  const spin = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const check = useRef(new Animated.Value(0)).current;
  const started = useRef(false);

  useEffect(() => {
    const spinLoop = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 12000, easing: Easing.linear, useNativeDriver: true }),
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    spinLoop.start();
    pulseLoop.start();
    return () => {
      spinLoop.stop();
      pulseLoop.stop();
    };
  }, [spin, pulse]);

  useEffect(() => {
    if (active && !started.current) {
      started.current = true;
      Animated.spring(check, { toValue: 1, delay: 250, useNativeDriver: true, speed: 6, bounciness: 12 }).start();
    }
  }, [active, check]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const glowScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.18] });
  const glowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.16] });

  return (
    <View style={styles.box}>
      {/* rotating faint sweep ring */}
      <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ rotate }] }]}>
        <Svg width={W} height={H}>
          <Circle cx={CX} cy={CY} r={R + 8} stroke="rgba(255,255,255,0.05)" strokeWidth={1} strokeDasharray="2 10" fill="none" />
        </Svg>
      </Animated.View>

      {/* static rings + coloured arcs */}
      <Svg width={W} height={H} style={StyleSheet.absoluteFill}>
        <Circle cx={CX} cy={CY} r={R} stroke="rgba(255,255,255,0.07)" strokeWidth={1} strokeDasharray="2 8" fill="none" />
        <Circle cx={CX} cy={CY} r={58} stroke="rgba(255,255,255,0.05)" strokeWidth={1} strokeDasharray="2 8" fill="none" />
        {ARCS.map((s, i) => (
          <Path key={i} d={arc(R, s.a1, s.a2)} stroke={s.color} strokeWidth={6} strokeLinecap="round" fill="none" />
        ))}
      </Svg>

      {/* centre dial */}
      <View style={styles.center} pointerEvents="none">
        <Animated.View style={[styles.glow, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]} />
        <Animated.View style={[styles.dial, { transform: [{ scale: check.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }] }]}>
          <Ionicons name="checkmark" size={40} color={colors.white} />
          <Text style={styles.done}>DONE</Text>
        </Animated.View>
      </View>

      {/* metric labels */}
      <View style={[styles.label, styles.top]}>
        <Text style={[styles.value, { color: colors.blue }]}>2h</Text>
        <Text style={styles.sub}>Screen Time</Text>
        <Ionicons name="time-outline" size={13} color={colors.blue} style={styles.labelIcon} />
      </View>

      <View style={[styles.label, styles.bottom]}>
        <Ionicons name="shield-checkmark" size={13} color={colors.green} style={styles.labelIconTop} />
        <Text style={[styles.value, { color: colors.green }]}>All OK</Text>
        <Text style={styles.sub}>Permissions</Text>
      </View>

      <View style={[styles.label, styles.left]}>
        <Text style={[styles.value, { color: colors.gold }]}>ON</Text>
        <Text style={styles.sub}>Focus Mode</Text>
        <Ionicons name="flash" size={13} color={colors.gold} style={styles.labelIcon} />
      </View>

      <View style={[styles.label, styles.right]}>
        <Text style={[styles.value, { color: colors.pink }]}>3</Text>
        <Text style={styles.sub}>Apps Locked</Text>
        <Ionicons name="lock-closed" size={12} color={colors.pink} style={styles.labelIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: W, height: H, alignItems: 'center', justifyContent: 'center' },
  center: { position: 'absolute', left: 0, right: 0, top: CY - 54, alignItems: 'center' },
  glow: { position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: colors.violet },
  dial: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: colors.violet,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.violet,
    shadowOpacity: 0.6,
    shadowRadius: 22,
    elevation: 12,
  },
  done: { fontFamily: fonts.bold, fontSize: 11, color: colors.white, letterSpacing: 2, marginTop: 1 },
  label: { position: 'absolute', alignItems: 'center', width: 96 },
  labelIcon: { marginTop: 2 },
  labelIconTop: { marginBottom: 2 },
  top: { top: 2, left: CX - 48 },
  bottom: { top: CY + 84, left: CX - 48 },
  left: { top: CY - 28, left: 4 },
  right: { top: CY - 28, right: 4 },
  value: { fontFamily: fonts.extrabold, fontSize: 18 },
  sub: { fontFamily: fonts.regular, fontSize: 11, color: colors.textSecondary, marginTop: 1 },
});
