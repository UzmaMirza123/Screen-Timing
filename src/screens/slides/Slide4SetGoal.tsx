import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SlideLayout } from '../../components/SlideLayout';
import { Title, Subtitle } from '../../components/SlideText';
import { Entrance } from '../../components/Entrance';
import { GoalRing } from '../../illustrations/GoalRing';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { radius } from '../../theme/layout';

type Props = { focused: boolean; onSkip: () => void };

const OPTIONS = [1, 2, 3, 4];

export function Slide4SetGoal({ focused, onSkip }: Props) {
  const [hours, setHours] = useState(2);

  return (
    <SlideLayout showLogo onSkip={onSkip}>
      <Entrance active={focused} delay={40}>
        <Title>Set your daily{'\n'}screen-time goal</Title>
      </Entrance>
      <Entrance active={focused} delay={130}>
        <Subtitle>You can change this any time. We'll nudge you as you get close.</Subtitle>
      </Entrance>

      <Entrance active={focused} delay={240} style={styles.ring}>
        <GoalRing value={hours} max={4} onChange={setHours} />
      </Entrance>

      <Entrance active={focused} delay={340} style={styles.pills}>
        {OPTIONS.map((h) => {
          const active = h === hours;
          return (
            <Pressable
              key={h}
              onPress={() => setHours(h)}
              style={({ pressed }) => [
                styles.pill,
                active && styles.pillActive,
                pressed && styles.pillPressed,
              ]}
            >
              <Text style={[styles.pillText, active && styles.pillTextActive]}>{h}h</Text>
            </Pressable>
          );
        })}
      </Entrance>

      <Entrance active={focused} delay={430} style={styles.infoWrap}>
        <View style={styles.info}>
          <Ionicons name="information-circle" size={20} color={colors.violetLight} style={styles.infoIcon} />
          <Text style={styles.infoText}>
            The average person spends 4h+ on their phone daily. Setting a goal is the first step to reclaiming your time.
          </Text>
        </View>
      </Entrance>
    </SlideLayout>
  );
}

const styles = StyleSheet.create({
  ring: { marginTop: 26, marginBottom: 4 },
  pills: { flexDirection: 'row', gap: 10, width: '100%', marginTop: 26 },
  pill: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  pillActive: {
    backgroundColor: colors.violet,
    borderColor: colors.violet,
    shadowColor: colors.violet,
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  pillPressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  pillText: { fontFamily: fonts.semibold, fontSize: 16, color: colors.textSecondary },
  pillTextActive: { color: colors.white },
  infoWrap: { width: '100%', marginTop: 26 },
  info: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 15,
  },
  infoIcon: { marginRight: 10, marginTop: 1 },
  infoText: { flex: 1, fontFamily: fonts.regular, fontSize: 13, lineHeight: 19, color: colors.textSecondary },
});
