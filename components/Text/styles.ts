// Libs
import { StyleSheet } from 'react-native';

// Themes
import { fontSizes, lineHeights } from '@/themes';

export const textSizes = StyleSheet.create({
  '2xs': {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights['2xs'],
  },
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights['2xs'],
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.xs,
  },
  base: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.sm,
  },
  md: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.sm,
  },
  lg: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.base,
  },
  xl: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.lg,
  },
  '2xl': {
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights['2xl'],
  },
});
