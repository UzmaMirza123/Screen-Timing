import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SlideLayout } from '../../components/SlideLayout';
import { Title, Subtitle } from '../../components/SlideText';
import { Entrance } from '../../components/Entrance';
import { PillOption } from '../../components/PillOption';
import { CheckBadge } from '../../illustrations/CheckBadge';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';

type Props = { focused: boolean; onSkip: () => void };

const OPTIONS = ['More than 7 hours', '5-7 hours', '4-5 hours', '3-4 hours', '1-3 hours', 'Under 1 hours'];

export function SlideScreenTime({ focused, onSkip }: Props) {
  const [selected, setSelected] = useState('4-5 hours');

  return (
    <SlideLayout showLogo onSkip={onSkip}>
      <Entrance active={focused} delay={0} style={styles.hero}>
        <CheckBadge icon="phone-portrait-outline" active={focused} />
      </Entrance>

      <Entrance active={focused} delay={130}>
        <Title>What is your daily{'\n'}average Screen Time?</Title>
      </Entrance>
      <Entrance active={focused} delay={210}>
        <Subtitle>On your phone only. Your best guess is okay.</Subtitle>
      </Entrance>

      <View style={styles.list}>
        {OPTIONS.map((o, i) => (
          <Entrance key={o} active={focused} delay={310 + i * 60} style={styles.row}>
            <PillOption label={o} selected={selected === o} onPress={() => setSelected(o)} />
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
  hero: { marginTop: 6, marginBottom: 8 },
  list: { width: '100%', marginTop: 18 },
  row: { marginBottom: 10 },
  noteWrap: { width: '100%', marginTop: 8 },
  note: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  noteText: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.textSecondary },
});
