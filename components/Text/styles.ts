// Libs
import { StyleSheet } from 'react-native';

// Themes
import { fontSizes, lineHeights } from '@/themes';

export const textSizes = StyleSheet.create({
  '2xs': {
    fontSize: fontSizes['2xs'],
    lineHeight: lineHeights['xs'],
  },
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.sm,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.base,
  },
  base: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.md,
  },
  md: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.lg,
  },
  lg: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.xl,
  },
  xl: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights['2xl'],
  },
  '2xl': {
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights['2xl'] * 1.2,
  },
});
