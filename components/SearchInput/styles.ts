// Libs
import { StyleSheet } from 'react-native';

// Themes
import {
  borderRadius,
  colors,
  fontFamilies,
  fontSizes,
  lineHeights,
} from '@/themes';

// Types
import { TThemeScheme } from '@/types';

export const createSearchStyles = (scheme: TThemeScheme) => {
  const theme = colors[scheme];

  return StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: borderRadius.sm,
      paddingHorizontal: 18,
      backgroundColor: theme.searchInputBg,
    },

    searchInput: {
      flex: 1,
      paddingVertical: 13,
      paddingHorizontal: 8,
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.md,
      fontFamily: fontFamilies.primary.regular,
      color: theme.searchInputText,
    },

    clearSearchTextIcon: {
      fontSize: fontSizes.md,
    },
  });
};
