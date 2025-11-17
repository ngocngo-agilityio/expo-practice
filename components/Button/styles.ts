// Libs
import { StyleSheet } from 'react-native';

// Themes
import {
  borderRadius,
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
} from '@/themes';

// Types
import { TThemeScheme } from '@/types';

export const buttonBaseStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    fontFamily: fontFamilies.primary.semiBold,
    fontWeight: fontWeights.semibold,
  },
});

export const createButtonStyles = (scheme: TThemeScheme) => {
  const theme = colors[scheme];

  return {
    solid: StyleSheet.create({
      button: {
        backgroundColor: theme.solidBtnBg,
      },
      title: {
        color: theme.solidBtnTitle,
      },
    }),
  };
};

export const buttonSizes = {
  md: StyleSheet.create({
    button: { padding: 16, borderRadius: borderRadius.md },
    title: { fontSize: fontSizes.base, lineHeight: lineHeights.lg },
  }),
};
