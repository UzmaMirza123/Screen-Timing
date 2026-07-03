/**
 * Poppins family — loaded in App.tsx via @expo-google-fonts/poppins.
 * The onboarding uses a geometric-rounded sans that closely matches Poppins.
 */

export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
  extrabold: 'Poppins_800ExtraBold',
} as const;

export type FontKey = keyof typeof fonts;
