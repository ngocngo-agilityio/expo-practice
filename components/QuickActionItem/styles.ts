import { StyleSheet } from 'react-native';

// Types
import { TThemeScheme } from '@/types';

// Themes
import { colors } from '@/themes';

export const createQuickActionStyles = (scheme: TThemeScheme) => {
  const theme = colors[scheme];

  return StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    iconWrapper: {
      width: 54,
      height: 54,
      borderRadius: 54 / 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.actionItemBg,
    },
    label: {
      marginTop: 7,
      fontSize: 13,
      lineHeight: 15,
      color: theme.actionItemText,
    },
  });
};
