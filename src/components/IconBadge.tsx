import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  tintBg: string;
  tintBorder?: string;
  size?: number;
  iconSize?: number;
  rounded?: number;
  style?: ViewStyle;
};

/** A tinted, rounded "well" holding a single Ionicon — used across feature/permission rows. */
export function IconBadge({
  icon,
  color,
  tintBg,
  tintBorder,
  size = 42,
  iconSize = 20,
  rounded = 13,
  style,
}: Props) {
  return (
    <View
      style={[
        styles.badge,
        {
          width: size,
          height: size,
          borderRadius: rounded,
          backgroundColor: tintBg,
          borderColor: tintBorder ?? 'transparent',
          borderWidth: tintBorder ? 1 : 0,
        },
        style,
      ]}
    >
      <Ionicons name={icon} size={iconSize} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignItems: 'center', justifyContent: 'center' },
});
