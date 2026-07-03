import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SlideLayout } from '../../components/SlideLayout';
import { Title, Subtitle } from '../../components/SlideText';
import { Entrance } from '../../components/Entrance';
import { FeatureRow } from '../../components/FeatureRow';
import { ShieldBadge } from '../../illustrations/ShieldBadge';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';

type Props = { focused: boolean; onSkip: () => void };

const PERMISSIONS = [
  {
    icon: 'pulse' as const,
    title: 'Usage Access',
    subtitle: 'Monitor app usage and enforce focus sessions.',
  },
  {
    icon: 'notifications' as const,
    title: 'Notifications',
    subtitle: 'Timely reminders & progress alerts.',
  },
  {
    icon: 'time' as const,
    title: 'Track App Usage',
    subtitle: 'Daily and weekly breakdowns.',
  },
];

export function Slide5Permissions({ focused, onSkip }: Props) {
  return (
    <SlideLayout showLogo onSkip={onSkip}>
      <Entrance active={focused} delay={0} style={styles.hero}>
        <ShieldBadge active={focused} />
      </Entrance>

      <Entrance active={focused} delay={140}>
        <Title>Enable Essential{'\n'}Permissions</Title>
      </Entrance>
      <Entrance active={focused} delay={220}>
        <Subtitle>Grant access to unlock the full FocusLock AI experience.</Subtitle>
      </Entrance>

      <View style={styles.list}>
        {PERMISSIONS.map((p, i) => (
          <Entrance key={p.title} active={focused} delay={320 + i * 90} style={styles.row}>
            <FeatureRow
              icon={p.icon}
              iconColor={colors.violetLight}
              iconTintBg={colors.violetTintBg}
              iconTintBorder={colors.violetTintBorder}
              iconRounded={12}
              title={p.title}
              subtitle={p.subtitle}
            />
          </Entrance>
        ))}
      </View>

      <Entrance active={focused} delay={600} style={styles.noteWrap}>
        <View style={styles.note}>
          <Ionicons name="lock-closed" size={13} color={colors.textSecondary} style={{ marginRight: 6 }} />
          <Text style={styles.noteText}>Your data never leaves your device.</Text>
        </View>
      </Entrance>
    </SlideLayout>
  );
}

const styles = StyleSheet.create({
  hero: { marginTop: 6, marginBottom: 6 },
  list: { width: '100%', marginTop: 22 },
  row: { marginBottom: 12 },
  noteWrap: { width: '100%', marginTop: 6 },
  note: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  noteText: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.textSecondary },
});
