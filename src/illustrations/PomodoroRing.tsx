import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, G, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { screen } from '../theme/layout';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SIZE = 210;
const STROKE = 11;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;
const PROGRESS = 0.76;

type Props = { active: boolean };

/**
 * Deep-focus timer ring: a gradient progress arc that sweeps in on entrance,
 * a pulsing play button, and floating "streak" / "score" badges.
 */
export function PomodoroRing({ active }: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const floatL = useRef(new Animated.Value(0)).current;
  const floatR = useRef(new Animated.Value(0)).current;
  const started = useRef(false);

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    const mk = (v: Animated.Value, d: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(v, { toValue: 1, duration: d, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(v, { toValue: 0, duration: d, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
      );
    const l = mk(floatL, 2400);
    const r = mk(floatR, 2800);
    pulseLoop.start();
    l.start();
    r.start();
    return () => {
      pulseLoop.stop();
      l.stop();
      r.stop();
    };
  }, [pulse, floatL, floatR]);

  useEffect(() => {
    if (active && !started.current) {
      started.current = true;
      Animated.timing(progress, {
        toValue: PROGRESS,
        duration: 1400,
        delay: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false, // strokeDashoffset is a prop, not transform/opacity
      }).start();
    }
  }, [active, progress]);

  const dashOffset = progress.interpolate({ inputRange: [0, 1], outputRange: [CIRC, 0] });
  const playScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });
  const yL = floatL.interpolate({ inputRange: [0, 1], outputRange: [-4, 4] });
  const yR = floatR.interpolate({ inputRange: [0, 1], outputRange: [4, -4] });

  return (
    <View style={styles.box}>
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <SvgGradient id="ring" x1="0%" y1="100%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#8B5CF6" />
            <Stop offset="55%" stopColor="#5B8DEF" />
            <Stop offset="100%" stopColor="#4ECDC4" />
          </SvgGradient>
        </Defs>
        <G rotation={128} origin={`${SIZE / 2}, ${SIZE / 2}`}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={STROKE}
            fill="none"
          />
          <AnimatedCircle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke="url(#ring)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={dashOffset}
            fill="none"
          />
        </G>
      </Svg>

      {/* inner content */}
      <View style={styles.inner} pointerEvents="none">
        <Text style={styles.time}>25:00</Text>
        <Text style={styles.deep}>DEEP FOCUS</Text>
        <Animated.View style={[styles.play, { transform: [{ scale: playScale }] }]}>
          <Ionicons name="play" size={15} color={colors.white} style={{ marginLeft: 2 }} />
        </Animated.View>
        <View style={styles.sessionDots}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={[styles.sDot, { backgroundColor: i < 3 ? colors.violetLight : 'rgba(255,255,255,0.18)' }]} />
          ))}
        </View>
        <Text style={styles.sessions}>3 of 4 sessions</Text>
      </View>

      {/* streak badge */}
      <Animated.View style={[styles.badgeL, { transform: [{ translateY: yL }] }]}>
        <View style={styles.badgeRow}>
          <Ionicons name="flame" size={15} color={colors.orange} />
          <Text style={styles.badgeBig}>7</Text>
        </View>
        <Text style={styles.badgeSub}>days streak</Text>
      </Animated.View>

      {/* score badge */}
      <Animated.View style={[styles.badgeR, { transform: [{ translateY: yR }] }]}>
        <View style={styles.scoreRow}>
          <View>
            <Text style={[styles.badgeBig, { color: colors.green }]}>94</Text>
            <Text style={styles.badgeSub}>score</Text>
          </View>
          <View style={styles.bars}>
            {[8, 12, 7, 14, 10].map((h, i) => (
              <View key={i} style={[styles.bar, { height: h, backgroundColor: colors.green, opacity: 0.5 + i * 0.1 }]} />
            ))}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: screen.width, height: SIZE + 10, alignItems: 'center', justifyContent: 'center' },
  inner: { position: 'absolute', width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' },
  time: { fontFamily: fonts.bold, fontSize: 36, color: colors.white, letterSpacing: 1 },
  deep: { fontFamily: fonts.semibold, fontSize: 11, color: colors.textSecondary, letterSpacing: 3, marginTop: -2 },
  play: {
    marginTop: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.violetTintBg,
    borderWidth: 1,
    borderColor: colors.violetTintBorder,
  },
  sessionDots: { flexDirection: 'row', marginTop: 10 },
  sDot: { width: 5, height: 5, borderRadius: 3, marginHorizontal: 2.5 },
  sessions: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, marginTop: 6 },
  badgeL: {
    position: 'absolute',
    left: 14,
    top: 76,
    backgroundColor: colors.cardSolid,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  badgeR: {
    position: 'absolute',
    right: 10,
    top: 66,
    backgroundColor: colors.cardSolid,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  badgeRow: { flexDirection: 'row', alignItems: 'center' },
  badgeBig: { fontFamily: fonts.bold, fontSize: 17, color: colors.white, marginLeft: 5 },
  badgeSub: { fontFamily: fonts.regular, fontSize: 10, color: colors.textSecondary, marginTop: 1 },
  scoreRow: { flexDirection: 'row', alignItems: 'flex-end' },
  bars: { flexDirection: 'row', alignItems: 'flex-end', marginLeft: 8, marginBottom: 3 },
  bar: { width: 3, borderRadius: 2, marginHorizontal: 1 },
});
