import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radius } from '../theme/layout';

type Props = {
  label: string;
  onPress?: () => void;
  leadingIcon?: keyof typeof Ionicons.glyphMap;
};

export function PrimaryButton({ label, onPress, leadingIcon }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  const pressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 8 }).start();

  return (
    <Animated.View style={[styles.wrap, { transform: [{ scale }] }]}>
      <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut} style={styles.shadow}>
        <LinearGradient
          colors={colors.ctaGradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.button}
        >
          {leadingIcon ? (
            <Ionicons name={leadingIcon} size={19} color={colors.white} style={styles.leading} />
          ) : null}
          <Text style={styles.label}>{label}</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.white} style={styles.arrow} />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  shadow: {
    borderRadius: radius.pill,
    shadowColor: colors.violet,
    shadowOpacity: 0.55,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 14,
  },
  button: {
    height: 60,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    color: colors.white,
    letterSpacing: 0.2,
  },
  leading: { marginRight: 8, marginTop: 1 },
  arrow: { marginLeft: 8, marginTop: 1 },
});
