import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SlideLayout } from '../../components/SlideLayout';
import { Title, Subtitle } from '../../components/SlideText';
import { Entrance } from '../../components/Entrance';
import { StatCard } from '../../components/StatCard';
import { IconBadge } from '../../components/IconBadge';
import { PomodoroRing } from '../../illustrations/PomodoroRing';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { radius } from '../../theme/layout';

type Props = { focused: boolean; onSkip: () => void };

function TileCard({
  icon,
  iconColor,
  tintBg,
  tintBorder,
  title,
  subtitle,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  tintBg: string;
  tintBorder: string;
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.tile}>
      <IconBadge icon={icon} color={iconColor} tintBg={tintBg} tintBorder={tintBorder} rounded={12} />
      <Text style={styles.tileTitle}>{title}</Text>
      <Text style={styles.tileSub}>{subtitle}</Text>
    </View>
  );
}

export function Slide3StayFocused({ focused, onSkip }: Props) {
  return (
    <SlideLayout onSkip={onSkip}>
      <Entrance active={focused} delay={0} style={styles.hero}>
        <PomodoroRing active={focused} />
      </Entrance>

      <Entrance active={focused} delay={140}>
        <Title>Stay Focused Every Day</Title>
      </Entrance>
      <Entrance active={focused} delay={220}>
        <Subtitle>Use Pomodoro and Deep Focus sessions to boost productivity and achieve more.</Subtitle>
      </Entrance>

      <Entrance active={focused} delay={330} style={styles.tiles}>
        <TileCard
          icon="timer-outline"
          iconColor={colors.violetLight}
          tintBg={colors.violetTintBg}
          tintBorder={colors.violetTintBorder}
          title="Pomodoro"
          subtitle="25 min sessions"
        />
        <TileCard
          icon="aperture"
          iconColor={colors.blue}
          tintBg={colors.blueTintBg}
          tintBorder={colors.blueTintBorder}
          title="Deep Focus"
          subtitle="90 min flow"
        />
      </Entrance>

      <Entrance active={focused} delay={430} style={styles.stats}>
        <StatCard
          value="+40%"
          label="productivity boost"
          valueColor={colors.orange}
          tintBg={colors.orangeTintBg}
          tintBorder={colors.orangeTintBorder}
          icon="flame"
          valueSize={16}
        />
        <StatCard
          value="7-day"
          label="streak building"
          valueColor={colors.green}
          tintBg={colors.greenTintBg}
          tintBorder={colors.greenTintBorder}
          icon="trending-up"
          valueSize={16}
        />
        <StatCard
          value="94%"
          label="goal completion"
          valueColor={colors.blue}
          tintBg={colors.blueTintBg}
          tintBorder={colors.blueTintBorder}
          icon="checkmark-circle"
          valueSize={16}
        />
      </Entrance>
    </SlideLayout>
  );
}

const styles = StyleSheet.create({
  hero: { marginTop: 0, marginBottom: 6 },
  tiles: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 22 },
  tile: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 14,
  },
  tileTitle: { fontFamily: fonts.semibold, fontSize: 15, color: colors.textPrimary, marginTop: 12 },
  tileSub: { fontFamily: fonts.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  stats: { flexDirection: 'row', gap: 10, width: '100%', marginTop: 12 },
});
