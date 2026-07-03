import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { screen } from '../theme/layout';

/** Loops a value 0→1→0 forever and returns it. */
function useOscillator(duration: number) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(v, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [v, duration]);
  return v;
}

const APP_TINTS = ['#5B6CF6', '#F6685B', '#42C7A8', '#F6C85B', '#B15BF6', '#5BC0F6', '#F65B9E', '#8B5CF6', '#5BF6B0'];

/**
 * A floating phone locked mid-screen, ringed by a violet halo and orbited by
 * a few gently drifting stat cards ("2h saved today", screen-time chips).
 */
export function PhoneIllustration() {
  const phone = useOscillator(2600);
  const halo = useOscillator(2000);
  const cardA = useOscillator(2400);
  const cardB = useOscillator(3000);
  const cardC = useOscillator(2800);
  const cardD = useOscillator(3200);

  const y = (v: Animated.Value, amt: number) => v.interpolate({ inputRange: [0, 1], outputRange: [-amt, amt] });
  const haloScale = halo.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1.06] });
  const haloOpacity = halo.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.18] });
  const lockScale = halo.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });

  return (
    <View style={styles.box}>
      {/* violet halo */}
      <Animated.View
        style={[styles.halo, { opacity: haloOpacity, transform: [{ scale: haloScale }] }]}
      />

      {/* phone */}
      <Animated.View style={[styles.phone, { transform: [{ translateY: y(phone, 6) }] }]}>
        <View style={styles.notch} />
        <View style={styles.screen}>
          <View style={styles.grid}>
            {APP_TINTS.map((c, i) => (
              <View key={i} style={[styles.appDot, { backgroundColor: c + '55', borderColor: c + '99' }]} />
            ))}
          </View>
          <Animated.View style={[styles.phoneLock, { transform: [{ scale: lockScale }] }]}>
            <Ionicons name="lock-closed" size={22} color={colors.violetLight} />
          </Animated.View>
        </View>
        <View style={styles.homeBar} />
      </Animated.View>

      {/* floating cards */}
      <Animated.View style={[styles.cardTL, { transform: [{ rotate: '-16deg' }, { translateY: y(cardA, 5) }] }]}>
        <View style={[styles.bar, { width: 26 }]} />
        <View style={[styles.bar, { width: 18, marginTop: 4 }]} />
      </Animated.View>

      <Animated.View style={[styles.cardTR, { transform: [{ rotate: '14deg' }, { translateY: y(cardB, 6) }] }]}>
        <View style={[styles.bar, { width: 24 }]} />
        <View style={[styles.bar, { width: 14, marginTop: 4 }]} />
      </Animated.View>

      <Animated.View style={[styles.cardBL, { transform: [{ translateY: y(cardC, 6) }] }]}>
        <Ionicons name="leaf" size={20} color={colors.cyan} />
      </Animated.View>

      <Animated.View style={[styles.cardBR, { transform: [{ translateY: y(cardD, 5) }] }]}>
        <Text style={styles.savedValue}>2h</Text>
        <Text style={styles.savedLabel}>saved today</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: screen.width, height: 300, alignItems: 'center', justifyContent: 'center' },
  halo: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: colors.heroGlow,
  },
  phone: {
    width: 128,
    height: 244,
    borderRadius: 30,
    backgroundColor: '#15131F',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    paddingTop: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    elevation: 16,
  },
  notch: { width: 44, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.16)' },
  screen: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 12,
    marginBottom: 14,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.02)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 84,
    justifyContent: 'space-between',
    opacity: 0.9,
  },
  appDot: { width: 22, height: 22, borderRadius: 6, borderWidth: 1, marginVertical: 5 },
  phoneLock: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B1533',
    borderWidth: 1,
    borderColor: 'rgba(167,139,250,0.5)',
    shadowColor: colors.violet,
    shadowOpacity: 0.7,
    shadowRadius: 14,
    elevation: 8,
  },
  homeBar: { width: 40, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.22)', marginBottom: 2 },
  bar: { height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.35)' },
  cardTL: {
    position: 'absolute',
    left: 92,
    top: 40,
    width: 58,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(239,68,68,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.32)',
    padding: 10,
    justifyContent: 'center',
  },
  cardTR: {
    position: 'absolute',
    right: 90,
    top: 32,
    width: 54,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(239,68,68,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.30)',
    padding: 9,
    justifyContent: 'center',
  },
  cardBL: {
    position: 'absolute',
    left: 78,
    bottom: 60,
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: 'rgba(78,205,196,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.30)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBR: {
    position: 'absolute',
    right: 74,
    bottom: 56,
    borderRadius: 14,
    backgroundColor: 'rgba(139,92,246,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.34)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  savedValue: { fontFamily: fonts.bold, fontSize: 16, color: colors.violetLight },
  savedLabel: { fontFamily: fonts.regular, fontSize: 10, color: colors.textSecondary, marginTop: 1 },
});
