import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const screen = {
  width,
  height,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  gutter: 24, // horizontal screen padding
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  pill: 999,
};

export const ONBOARDING_STEPS = 5;
