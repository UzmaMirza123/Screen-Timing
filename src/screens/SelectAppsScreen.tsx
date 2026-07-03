import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { Chip } from '../components/Chip';
import { AppToggleRow } from '../components/AppToggleRow';
import { ScheduleRow } from '../components/ScheduleRow';
import { UnlockMethodCard } from '../components/UnlockMethodCard';
import { Brand } from '../components/BrandAppIcon';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radius, spacing } from '../theme/layout';

type Props = { onConfirm: () => void; onBack: () => void; onSkip: () => void };

type AppItem = { brand: Brand; name: string; category: 'Social' | 'Entertainment'; iconBg?: string };

const APPS: AppItem[] = [
  { brand: 'instagram', name: 'Instagram', category: 'Social' },
  { brand: 'x', name: 'Twitter / X', category: 'Social', iconBg: '#0B0B0F' },
  { brand: 'youtube', name: 'YouTube', category: 'Entertainment' },
  { brand: 'tiktok', name: 'TikTok', category: 'Entertainment' },
  { brand: 'facebook', name: 'Facebook', category: 'Social' },
  { brand: 'netflix', name: 'Netflix', category: 'Entertainment' },
];

const CHIPS = ['All', 'Social', 'Entertainment', 'Games'];

const SCHEDULES = [
  { key: 'morning', title: 'Morning', time: '6 AM – 9 AM' },
  { key: 'work', title: 'Work', time: '9 AM – 5 PM' },
  { key: 'evening', title: 'Evening', time: '8 PM – 11 PM' },
];

function SectionHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {right}
    </View>
  );
}

export function SelectAppsScreen({ onConfirm, onBack, onSkip }: Props) {
  const insets = useSafeAreaInsets();
  const [apps, setApps] = useState<Record<string, boolean>>({
    Instagram: true,
    'Twitter / X': true,
    YouTube: true,
    TikTok: false,
    Facebook: false,
    Netflix: false,
  });
  const [schedules, setSchedules] = useState<Record<string, boolean>>({
    morning: false,
    work: true,
    evening: true,
  });
  const [method, setMethod] = useState<'pin' | 'face' | 'touch'>('pin');
  const [chip, setChip] = useState('All');
  const [query, setQuery] = useState('');

  const lockedCount = useMemo(() => Object.values(apps).filter(Boolean).length, [apps]);

  const visibleApps = useMemo(
    () =>
      APPS.filter((a) => (chip === 'All' ? true : a.category === chip)).filter((a) =>
        a.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [chip, query],
  );

  return (
    <View style={styles.root}>
      <GradientBackground glowY={0.12} glowOpacity={0.4} />

      {/* header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={onBack} hitSlop={10} style={styles.back}>
          <Ionicons name="arrow-back" size={18} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Select Apps</Text>
        <Pressable onPress={onSkip} hitSlop={10}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing.gutter, paddingBottom: 150 + insets.bottom }}
      >
        {/* stat cards */}
        <View style={styles.stats}>
          <View style={[styles.statCard, { backgroundColor: colors.violetTintBg, borderColor: colors.violetTintBorder }]}>
            <View style={styles.statTop}>
              <Ionicons name="lock-closed" size={13} color={colors.violetLight} />
              <Text style={styles.statLabel}>Total Locked</Text>
            </View>
            <Text style={[styles.statValue, { color: colors.white }]}>{lockedCount}</Text>
            <Text style={styles.statSub}>apps selected</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.greenTintBg, borderColor: colors.greenTintBorder }]}>
            <View style={styles.statTop}>
              <Ionicons name="time-outline" size={13} color={colors.green} />
              <Text style={styles.statLabel}>Time Saved</Text>
            </View>
            <Text style={[styles.statValue, { color: colors.green }]}>3.2h</Text>
            <Text style={styles.statSub}>per day avg</Text>
          </View>
        </View>

        {/* search */}
        <View style={styles.search}>
          <Ionicons name="search" size={17} color={colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search apps..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
          />
        </View>

        {/* filter chips */}
        <View style={styles.chips}>
          {CHIPS.map((c) => (
            <Chip key={c} label={c} active={chip === c} onPress={() => setChip(c)} />
          ))}
        </View>

        {/* apps */}
        <SectionHeader
          title="APPS"
          right={
            <View style={styles.badgeViolet}>
              <Ionicons name="lock-closed" size={11} color={colors.violetLight} />
              <Text style={styles.badgeVioletText}>{lockedCount} selected</Text>
            </View>
          }
        />
        {visibleApps.map((a) => (
          <View key={a.name} style={styles.rowGap}>
            <AppToggleRow
              brand={a.brand}
              name={a.name}
              category={a.category}
              iconBg={a.iconBg}
              value={!!apps[a.name]}
              onChange={(v) => setApps((p) => ({ ...p, [a.name]: v }))}
            />
          </View>
        ))}
        {visibleApps.length === 0 ? <Text style={styles.empty}>No apps in this category.</Text> : null}

        {/* schedule */}
        <SectionHeader
          title="LOCK SCHEDULE"
          right={
            <View style={styles.badgeGold}>
              <Ionicons name="calendar-outline" size={11} color={colors.gold} />
              <Text style={styles.badgeGoldText}>Custom</Text>
            </View>
          }
        />
        {SCHEDULES.map((s) => (
          <View key={s.key} style={styles.rowGap}>
            <ScheduleRow
              title={s.title}
              time={s.time}
              value={!!schedules[s.key]}
              onChange={(v) => setSchedules((p) => ({ ...p, [s.key]: v }))}
            />
          </View>
        ))}

        {/* unlock method */}
        <SectionHeader title="UNLOCK METHOD" />
        <View style={styles.methods}>
          <UnlockMethodCard icon="keypad" label="PIN Code" sub="4-digit PIN" active={method === 'pin'} onPress={() => setMethod('pin')} />
          <UnlockMethodCard icon="scan" label="Face ID" sub="Biometric" active={method === 'face'} onPress={() => setMethod('face')} />
          <UnlockMethodCard icon="finger-print" label="Touch ID" sub="Fingerprint" active={method === 'touch'} onPress={() => setMethod('touch')} />
        </View>

        {/* static step dots */}
        <View style={styles.dots}>
          {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} style={[styles.dot, i === 1 ? styles.dotActive : styles.dotInactive]} />
          ))}
        </View>
      </ScrollView>

      {/* pinned confirm */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 14 }]}>
        <PrimaryButton label="Confirm Lock" onPress={onConfirm} />
        <Text style={styles.footer}>You can always change this later</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.gutter,
    paddingBottom: 10,
  },
  back: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  headerTitle: { fontFamily: fonts.bold, fontSize: 18, color: colors.textPrimary },
  skip: { fontFamily: fonts.medium, fontSize: 15, color: colors.textSecondary },
  stats: { flexDirection: 'row', gap: 12, marginTop: 6 },
  statCard: { flex: 1, borderRadius: radius.lg, borderWidth: 1, padding: 15 },
  statTop: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statLabel: { fontFamily: fonts.medium, fontSize: 12, color: colors.textSecondary },
  statValue: { fontFamily: fonts.extrabold, fontSize: 26, marginTop: 6 },
  statSub: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 1 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: 14,
    height: 48,
    marginTop: 18,
  },
  searchInput: { flex: 1, marginLeft: 10, color: colors.textPrimary, fontFamily: fonts.regular, fontSize: 14 },
  chips: { flexDirection: 'row', gap: 8, marginTop: 14 },
  section: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, marginBottom: 12 },
  sectionTitle: { fontFamily: fonts.semibold, fontSize: 12, color: colors.textMuted, letterSpacing: 1.5 },
  badgeViolet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.violetTintBg,
    borderWidth: 1,
    borderColor: colors.violetTintBorder,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeVioletText: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.violetLight },
  badgeGold: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.goldTintBg,
    borderWidth: 1,
    borderColor: colors.goldTintBorder,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeGoldText: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.gold },
  rowGap: { marginBottom: 12 },
  empty: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted, textAlign: 'center', paddingVertical: 10 },
  methods: { flexDirection: 'row', gap: 10 },
  dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 26 },
  dot: { height: 7, borderRadius: 4, marginHorizontal: 3.5 },
  dotActive: { width: 22, backgroundColor: colors.violet },
  dotInactive: { width: 7, backgroundColor: colors.textFaint, opacity: 0.5 },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.gutter,
    alignItems: 'center',
  },
  footer: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.textMuted, marginTop: 10 },
});
