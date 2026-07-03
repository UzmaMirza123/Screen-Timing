import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { Entrance } from '../components/Entrance';
import { RadarDone } from '../illustrations/RadarDone';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radius, spacing } from '../theme/layout';

type Props = { onEnter: () => void; onReplay: () => void };

export function AllSetScreen({ onEnter, onReplay }: Props) {
  const insets = useSafeAreaInsets();
  const flame = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(flame, { toValue: 1, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(flame, { toValue: 0, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [flame]);

  const flameScale = flame.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });

  return (
    <View style={styles.root}>
      <GradientBackground glowY={0.28} />

      <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
        <Entrance active delay={0}>
          <RadarDone active />
        </Entrance>

        <Entrance active delay={200}>
          <Text style={styles.title}>You're all set!</Text>
        </Entrance>
        <Entrance active delay={280}>
          <Text style={styles.sub}>Your focus environment is ready to go.</Text>
        </Entrance>

        <Entrance active delay={380} style={styles.streakWrap}>
          <View style={styles.streak}>
            <Animated.View style={[styles.flame, { transform: [{ scale: flameScale }] }]}>
              <Ionicons name="flame" size={20} color={colors.orange} />
            </Animated.View>
            <View style={styles.streakText}>
              <Text style={styles.streakTitle}>Day 1 streak starts now</Text>
              <Text style={styles.streakSub}>Complete a session to keep it going</Text>
            </View>
            <View style={styles.multiplier}>
              <Text style={styles.multiplierText}>x1</Text>
            </View>
          </View>
        </Entrance>
      </View>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <PrimaryButton label="Enter Focus Lock" leadingIcon="sparkles" onPress={onEnter} />
        <Pressable onPress={onReplay} hitSlop={10} style={({ pressed }) => pressed && { opacity: 0.6 }}>
          <Text style={styles.replay}>Replay Onboarding</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1, paddingHorizontal: spacing.gutter, alignItems: 'center' },
  title: { fontFamily: fonts.extrabold, fontSize: 30, color: colors.textTitle, textAlign: 'center', marginTop: 8 },
  sub: {
    fontFamily: fonts.regular,
    fontSize: 14.5,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  streakWrap: { width: '100%', marginTop: 28 },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.goldTintBorder,
    padding: 14,
  },
  flame: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orangeTintBg,
    borderWidth: 1,
    borderColor: colors.orangeTintBorder,
  },
  streakText: { flex: 1, marginLeft: 13 },
  streakTitle: { fontFamily: fonts.semibold, fontSize: 14.5, color: colors.gold },
  streakSub: { fontFamily: fonts.regular, fontSize: 12, color: colors.textSecondary, marginTop: 1 },
  multiplier: {
    backgroundColor: colors.goldTintBg,
    borderWidth: 1,
    borderColor: colors.goldTintBorder,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  multiplierText: { fontFamily: fonts.bold, fontSize: 14, color: colors.gold },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: spacing.gutter, alignItems: 'center' },
  replay: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.textMuted, marginTop: 14 },
});
