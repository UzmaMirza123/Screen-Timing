import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SlideLayout } from '../../components/SlideLayout';
import { Title, Subtitle } from '../../components/SlideText';
import { Entrance } from '../../components/Entrance';
import { OptionRow } from '../../components/OptionRow';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';

type Props = { focused: boolean; onSkip: () => void };

const OPTIONS: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: 'code-slash', label: 'Software Development' },
  { icon: 'briefcase', label: 'CEO / Founder' },
  { icon: 'wifi', label: 'Remote Worker' },
  { icon: 'bar-chart', label: 'Finance / Ops / Consulting' },
  { icon: 'color-palette', label: 'Art / Content' },
  { icon: 'book', label: 'Education' },
  { icon: 'ellipsis-horizontal', label: 'Others' },
];

export function SlideOccupation({ focused, onSkip }: Props) {
  const [selected, setSelected] = useState<string[]>(['Art / Content', 'Education']);

  const toggle = (label: string) =>
    setSelected((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));

  return (
    <SlideLayout showLogo onSkip={onSkip}>
      <Entrance active={focused} delay={40}>
        <Title>What is your{'\n'}occupation?</Title>
      </Entrance>
      <Entrance active={focused} delay={130}>
        <Subtitle>We'll personalize your focus plan based on your work style.</Subtitle>
      </Entrance>

      <View style={styles.list}>
        {OPTIONS.map((o, i) => (
          <Entrance key={o.label} active={focused} delay={230 + i * 55} style={styles.row}>
            <OptionRow
              icon={o.icon}
              label={o.label}
              selected={selected.includes(o.label)}
              onPress={() => toggle(o.label)}
            />
          </Entrance>
        ))}
      </View>

      <Entrance active={focused} delay={640} style={styles.noteWrap}>
        <View style={styles.note}>
          <Ionicons name="lock-closed" size={13} color={colors.textSecondary} style={{ marginRight: 6 }} />
          <Text style={styles.noteText}>Your data never leaves your device.</Text>
        </View>
      </Entrance>
    </SlideLayout>
  );
}

const styles = StyleSheet.create({
  list: { width: '100%', marginTop: 20 },
  row: { marginBottom: 10 },
  noteWrap: { width: '100%', marginTop: 8 },
  note: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  noteText: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.textSecondary },
});
