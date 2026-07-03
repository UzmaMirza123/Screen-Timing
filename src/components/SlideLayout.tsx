import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { screen, spacing } from '../theme/layout';
import { OnboardingHeader } from './OnboardingHeader';

/** Vertical space reserved at the bottom of each slide for the pinned dots + CTA. */
export const BOTTOM_BAR_SPACE = 168;

type Props = {
  showLogo?: boolean;
  onSkip?: () => void;
  children: React.ReactNode;
};

/**
 * Shared per-slide chrome: safe-area header (Skip + optional logo) and a
 * scrollable content column that clears the pinned bottom bar.
 */
export function SlideLayout({ showLogo, onSkip, children }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.page, { width: screen.width }]}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <OnboardingHeader showLogo={showLogo} onSkip={onSkip} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: BOTTOM_BAR_SPACE + insets.bottom },
        ]}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  header: { paddingHorizontal: spacing.gutter },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.gutter,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
