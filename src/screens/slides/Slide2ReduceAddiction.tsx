import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SlideLayout } from '../../components/SlideLayout';
import { Title, Subtitle } from '../../components/SlideText';
import { Entrance } from '../../components/Entrance';
import { StatCard } from '../../components/StatCard';
import { PhoneIllustration } from '../../illustrations/PhoneIllustration';
import { colors } from '../../theme/colors';

type Props = { focused: boolean; onSkip: () => void };

export function Slide2ReduceAddiction({ focused, onSkip }: Props) {
  return (
    <SlideLayout showLogo onSkip={onSkip}>
      <Entrance active={focused} delay={0} style={styles.hero}>
        <PhoneIllustration />
      </Entrance>

      <Entrance active={focused} delay={120}>
        <Title>Reduce Screen{'\n'}Addiction</Title>
      </Entrance>
      <Entrance active={focused} delay={200}>
        <Subtitle>Take control of your digital habits and spend less time on distracting apps.</Subtitle>
      </Entrance>

      <Entrance active={focused} delay={320} style={styles.stats}>
        <StatCard
          value="4h 12m"
          label="Avg daily screen time"
          valueColor={colors.red}
          tintBg={colors.redTintBg}
          tintBorder={colors.redTintBorder}
        />
        <StatCard
          value="73%"
          label="Spent on social media"
          valueColor={colors.yellow}
          tintBg={colors.yellowTintBg}
          tintBorder={colors.yellowTintBorder}
        />
      </Entrance>
    </SlideLayout>
  );
}

const styles = StyleSheet.create({
  hero: { marginTop: 0, marginBottom: 4 },
  stats: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 26 },
});
