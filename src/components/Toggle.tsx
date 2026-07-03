import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  value: boolean;
  onValueChange: (v: boolean) => void;
};

const W = 48;
const H = 28;
const PAD = 3;
const KNOB = H - PAD * 2;

/** Custom animated on/off switch (violet track when on) matching the design. */
export function Toggle({ value, onValueChange }: Props) {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, anim]);

  const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [0, W - KNOB - PAD * 2] });
  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.switchOff, colors.switchOn],
  });

  return (
    <Pressable onPress={() => onValueChange(!value)} hitSlop={8}>
      <Animated.View style={[styles.track, { backgroundColor }]}>
        <Animated.View style={[styles.knob, { transform: [{ translateX }] }]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: W,
    height: H,
    borderRadius: H / 2,
    padding: PAD,
    justifyContent: 'center',
  },
  knob: {
    width: KNOB,
    height: KNOB,
    borderRadius: KNOB / 2,
    backgroundColor: colors.switchKnob,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});
