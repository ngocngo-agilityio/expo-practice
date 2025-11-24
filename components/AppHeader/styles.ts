// Libs
import { StyleSheet } from 'react-native';

// Themes
import { colors, fontFamilies } from '@/themes';

// Types
import { TThemeScheme } from '@/types';

export const createAppHeaderStyles = (scheme: TThemeScheme) => {
  const theme = colors[scheme];

  return StyleSheet.create({
    container: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      backgroundColor: theme.appBg,
      minHeight: 42,
    },
    iconWrapper: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: theme.appHeaderIconBg,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    },
    title: {
      position: 'absolute',
      left: 0,
      right: 0,
      textAlign: 'center',
      fontFamily: fontFamilies.primary.medium,
      color: theme.appHeaderTitle,
      zIndex: 1,
    },
  });
};
