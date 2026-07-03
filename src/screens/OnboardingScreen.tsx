import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/GradientBackground';
import { PagerDots } from '../components/PagerDots';
import { PrimaryButton } from '../components/PrimaryButton';
import { Footer } from '../components/Footer';
import { screen, spacing } from '../theme/layout';
import { Slide1LockApps } from './slides/Slide1LockApps';
import { Slide2ReduceAddiction } from './slides/Slide2ReduceAddiction';
import { Slide3StayFocused } from './slides/Slide3StayFocused';
import { Slide4SetGoal } from './slides/Slide4SetGoal';
import { Slide5Permissions } from './slides/Slide5Permissions';

const COUNT = 5;
const PAGE = screen.width;

type Props = { onComplete: () => void };

// Glow sits a little higher on illustration-heavy slides, lower on text-first ones.
const GLOW_Y = [0.3, 0.32, 0.3, 0.34, 0.28];

export function OnboardingScreen({ onComplete }: Props) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false,
    listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const i = Math.round(e.nativeEvent.contentOffset.x / PAGE);
      setIndex((prev) => (i !== prev ? i : prev));
    },
  });

  const goNext = useCallback(() => {
    if (index < COUNT - 1) {
      scrollRef.current?.scrollTo({ x: (index + 1) * PAGE, animated: true });
    } else {
      onComplete();
    }
  }, [index, onComplete]);

  const ctaLabel = index === 0 ? 'Select Apps' : 'Continue';
  const showFooter = index !== 1;

  return (
    <View style={styles.root}>
      <GradientBackground glowY={GLOW_Y[index]} />

      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        style={styles.scroll}
      >
        <Slide1LockApps focused={index === 0} onSkip={onComplete} />
        <Slide2ReduceAddiction focused={index === 1} onSkip={onComplete} />
        <Slide3StayFocused focused={index === 2} onSkip={onComplete} />
        <Slide4SetGoal focused={index === 3} onSkip={onComplete} />
        <Slide5Permissions focused={index === 4} onSkip={onComplete} />
      </Animated.ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 14 }]}>
        <PagerDots scrollX={scrollX} count={COUNT} pageWidth={PAGE} />
        <View style={styles.buttonWrap}>
          <PrimaryButton label={ctaLabel} onPress={goNext} />
        </View>
        <View style={styles.footerSlot}>{showFooter ? <Footer /> : null}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.gutter,
    alignItems: 'center',
  },
  buttonWrap: { width: '100%', marginTop: 18 },
  footerSlot: { height: 34, width: '100%', marginTop: 8, alignItems: 'center', justifyContent: 'center' },
});
