import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';

import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { SelectAppsScreen } from './src/screens/SelectAppsScreen';
import { AllSetScreen } from './src/screens/AllSetScreen';
import { colors } from './src/theme/colors';

SplashScreen.preventAutoHideAsync().catch(() => {});

type Phase = 'onboarding' | 'selectApps' | 'done';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const [phase, setPhase] = useState<Phase>('onboarding');
  const [sessionKey, setSessionKey] = useState(0);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  const replay = useCallback(() => {
    setSessionKey((k) => k + 1);
    setPhase('onboarding');
  }, []);

  const enterApp = useCallback(() => {
    Alert.alert('Focus Lock', 'Your focus session would start here. 🚀');
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <StatusBar style="light" />
        {phase === 'onboarding' && (
          <OnboardingScreen key={sessionKey} onComplete={() => setPhase('selectApps')} />
        )}
        {phase === 'selectApps' && (
          <SelectAppsScreen
            onConfirm={() => setPhase('done')}
            onBack={() => setPhase('onboarding')}
            onSkip={() => setPhase('done')}
          />
        )}
        {phase === 'done' && <AllSetScreen onEnter={enterApp} onReplay={replay} />}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgBottom },
});
