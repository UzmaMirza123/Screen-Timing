import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { colors } from '../theme/colors';
import { screen } from '../theme/layout';
import { Starfield } from './Starfield';

type Props = {
  /** Vertical centre of the violet hero glow, 0..1 from top. */
  glowY?: number;
  glowOpacity?: number;
  stars?: boolean;
};

/**
 * Full-screen dark backdrop: vertical navy→black gradient, a violet radial
 * hero glow, and a twinkling starfield. Rendered as an absolute-fill layer
 * behind every onboarding slide.
 */
export function GradientBackground({ glowY = 0.32, glowOpacity = 0.55, stars = true }: Props) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={[colors.bgTop, colors.bgMid, colors.bgBottom]}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
      <Svg style={StyleSheet.absoluteFill} width={screen.width} height={screen.height}>
        <Defs>
          <RadialGradient id="heroGlow" cx="50%" cy={`${glowY * 100}%`} rx="62%" ry="46%">
            <Stop offset="0%" stopColor={colors.heroGlow} stopOpacity={glowOpacity} />
            <Stop offset="55%" stopColor={colors.heroGlow} stopOpacity={glowOpacity * 0.28} />
            <Stop offset="100%" stopColor={colors.heroGlow} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={screen.width} height={screen.height} fill="url(#heroGlow)" />
      </Svg>
      {stars ? <Starfield /> : null}
    </View>
  );
}
