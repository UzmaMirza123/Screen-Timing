import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';

import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { GradientBackground } from './src/components/GradientBackground';
import { PrimaryButton } from './src/components/PrimaryButton';
import { colors } from './src/theme/colors';
import { fonts } from './src/theme/typography';
import { spacing } from './src/theme/layout';

SplashScreen.preventAutoHideAsync().catch(() => {});

function AllSet({ onRestart }: { onRestart: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.done}>
      <GradientBackground glowY={0.4} />
      <View style={styles.doneInner}>
        <View style={styles.doneBadge}>
          <Ionicons name="checkmark" size={54} color={colors.white} />
        </View>
        <Text style={styles.doneTitle}>You're all set!</Text>
        <Text style={styles.doneSub}>FocusLock AI is ready to help you reclaim your time.</Text>
      </View>
      <View style={[styles.doneFooter, { paddingBottom: insets.bottom + 20 }]}>
        <PrimaryButton label="Restart onboarding" onPress={onRestart} />
      </View>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const [done, setDone] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  const restart = useCallback(() => {
    setDone(false);
    setSessionKey((k) => k + 1);
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <StatusBar style="light" />
        {done ? (
          <AllSet onRestart={restart} />
        ) : (
          <OnboardingScreen key={sessionKey} onComplete={() => setDone(true)} />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgBottom },
  done: { flex: 1 },
  doneInner: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.gutter },
  doneBadge: {
    width: 104,
    height: 104,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.violet,
    marginBottom: 28,
    shadowColor: colors.violet,
    shadowOpacity: 0.6,
    shadowRadius: 26,
    elevation: 14,
  },
  doneTitle: { fontFamily: fonts.extrabold, fontSize: 28, color: colors.textTitle },
  doneSub: {
    fontFamily: fonts.regular,
    fontSize: 14.5,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  doneFooter: { paddingHorizontal: spacing.gutter },
});
