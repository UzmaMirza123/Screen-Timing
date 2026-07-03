import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SlideLayout } from '../../components/SlideLayout';
import { Title, Subtitle } from '../../components/SlideText';
import { Entrance } from '../../components/Entrance';
import { FeatureRow } from '../../components/FeatureRow';
import { OrbitIllustration } from '../../illustrations/OrbitIllustration';
import { colors } from '../../theme/colors';

type Props = { focused: boolean; onSkip: () => void };

const FEATURES = [
  {
    icon: 'shield-checkmark' as const,
    iconColor: colors.green,
    iconTintBg: colors.greenTintBg,
    iconTintBorder: colors.greenTintBorder,
    title: 'One-tap block for any app on your phone',
  },
  {
    icon: 'time' as const,
    iconColor: colors.blue,
    iconTintBg: colors.blueTintBg,
    iconTintBorder: colors.blueTintBorder,
    title: 'Schedule lock times and focus windows',
  },
  {
    icon: 'lock-closed' as const,
    iconColor: colors.violetLight,
    iconTintBg: colors.violetTintBg,
    iconTintBorder: colors.violetTintBorder,
    title: 'Password-protect blocks so you stay committed',
  },
];

export function Slide1LockApps({ focused, onSkip }: Props) {
  return (
    <SlideLayout onSkip={onSkip}>
      <Entrance active={focused} delay={0} style={styles.hero}>
        <OrbitIllustration />
      </Entrance>

      <Entrance active={focused} delay={120}>
        <Title>Lock Distracting Apps</Title>
      </Entrance>
      <Entrance active={focused} delay={200}>
        <Subtitle>Block social media, games, and other distractions with powerful app locking tools.</Subtitle>
      </Entrance>

      <View style={styles.list}>
        {FEATURES.map((f, i) => (
          <Entrance key={f.title} active={focused} delay={300 + i * 90} style={styles.row}>
            <FeatureRow {...f} iconRounded={21} />
          </Entrance>
        ))}
      </View>
    </SlideLayout>
  );
}

const styles = StyleSheet.create({
  hero: { marginTop: 4, marginBottom: 8 },
  list: { width: '100%', marginTop: 22 },
  row: { marginBottom: 12 },
});
