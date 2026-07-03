import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export type Brand = 'instagram' | 'snapchat' | 'music' | 'x' | 'youtube' | 'facebook';

const CONFIG: Record<
  Brand,
  { bg?: string; gradient?: readonly string[]; icon: keyof typeof Ionicons.glyphMap; glyph: string }
> = {
  instagram: { gradient: colors.instagram, icon: 'logo-instagram', glyph: colors.white },
  snapchat: { bg: colors.snapchat, icon: 'logo-snapchat', glyph: colors.white },
  music: { bg: colors.music, icon: 'musical-note', glyph: colors.musicGlyph },
  x: { bg: colors.x, icon: 'logo-x', glyph: colors.white },
  youtube: { bg: colors.youtube, icon: 'play', glyph: colors.white },
  facebook: { bg: colors.facebook, icon: 'logo-facebook', glyph: colors.white },
};

type Props = { brand: Brand; size?: number };

export function BrandAppIcon({ brand, size = 52 }: Props) {
  const cfg = CONFIG[brand];
  const rounded = size * 0.3;
  const iconSize = size * 0.5;

  const inner = <Ionicons name={cfg.icon} size={iconSize} color={cfg.glyph} />;

  return (
    <View style={[styles.shadow, { width: size, height: size, borderRadius: rounded }]}>
      {cfg.gradient ? (
        <LinearGradient
          colors={cfg.gradient as [string, string, ...string[]]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.9, y: 0.9 }}
          style={[styles.tile, { borderRadius: rounded }]}
        >
          {inner}
        </LinearGradient>
      ) : (
        <View style={[styles.tile, { borderRadius: rounded, backgroundColor: cfg.bg }]}>{inner}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.black,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  tile: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
