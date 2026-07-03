import React, { useEffect, useRef } from 'react';
import { Animated, Easing, PanResponder, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, G, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SIZE = 196;
const STROKE = 13;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;
const KNOB = 26;

type Props = {
  value: number; // hours
  max?: number;
  onChange: (hours: number) => void;
};

/**
 * Circular daily-goal selector. The violet arc fills clockwise from the top to
 * value/max; a draggable knob rides the leading edge, and the arc + centre
 * number spring to any new value (from a drag or a pill tap).
 */
export function GoalRing({ value, max = 4, onChange }: Props) {
  const frac = useRef(new Animated.Value(value / max)).current;
  const bounce = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(frac, {
      toValue: value / max,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    bounce.setValue(0.82);
    Animated.spring(bounce, { toValue: 1, useNativeDriver: true, speed: 12, bounciness: 10 }).start();
  }, [value, max, frac, bounce]);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => handleTouch(e.nativeEvent.locationX, e.nativeEvent.locationY),
      onPanResponderMove: (e) => handleTouch(e.nativeEvent.locationX, e.nativeEvent.locationY),
    }),
  ).current;

  // Keep the latest onChange/max without re-creating the PanResponder.
  const ref = useRef({ onChange, max, value });
  ref.current = { onChange, max, value };

  function handleTouch(x: number, y: number) {
    const dx = x - SIZE / 2;
    const dy = y - SIZE / 2;
    const deg = (Math.atan2(dy, dx) * 180) / Math.PI; // 0=right, 90=down, -90=up
    const fromTop = (deg + 90 + 360) % 360; // clockwise from top
    let hours = Math.round((fromTop / 360) * ref.current.max);
    hours = Math.min(ref.current.max, Math.max(1, hours));
    if (hours !== ref.current.value) ref.current.onChange(hours);
  }

  const dashOffset = frac.interpolate({ inputRange: [0, 1], outputRange: [CIRC, 0] });
  const knobRotate = frac.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles.box} {...pan.panHandlers}>
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <SvgGradient id="goal" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colors.violetLight} />
            <Stop offset="100%" stopColor={colors.violet} />
          </SvgGradient>
        </Defs>
        <G rotation={-90} origin={`${SIZE / 2}, ${SIZE / 2}`}>
          <Circle cx={SIZE / 2} cy={SIZE / 2} r={R} stroke="rgba(255,255,255,0.07)" strokeWidth={STROKE} fill="none" />
          <AnimatedCircle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke="url(#goal)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={dashOffset}
            fill="none"
          />
        </G>
      </Svg>

      {/* knob rides the leading edge */}
      <Animated.View
        style={[styles.knobLayer, { transform: [{ rotate: knobRotate }] }]}
        pointerEvents="none"
      >
        <View style={styles.knob} />
      </Animated.View>

      {/* centre value */}
      <Animated.View style={[styles.center, { transform: [{ scale: bounce }] }]} pointerEvents="none">
        <Text style={styles.value}>{`${value}h`}</Text>
        <Text style={styles.per}>per day</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' },
  knobLayer: { position: 'absolute', width: SIZE, height: SIZE, alignItems: 'center' },
  knob: {
    width: KNOB,
    height: KNOB,
    borderRadius: KNOB / 2,
    marginTop: STROKE / 2 - KNOB / 2, // centre the knob on the stroke at 12 o'clock
    backgroundColor: colors.white,
    borderWidth: 5,
    borderColor: colors.violet,
    shadowColor: colors.violet,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
  center: { position: 'absolute', alignItems: 'center' },
  value: { fontFamily: fonts.bold, fontSize: 46, color: colors.white, letterSpacing: 0.5 },
  per: { fontFamily: fonts.regular, fontSize: 14, color: colors.textSecondary, marginTop: -4 },
});
