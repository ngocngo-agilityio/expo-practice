import { StyleSheet } from 'react-native';

// Themes
import { BASE_COLORS, colors } from '@/themes';

// Types
import { TThemeScheme } from '@/types';

export const createSendToStyles = (scheme: TThemeScheme) => {
  const theme = colors[scheme];

  return StyleSheet.create({
    container: {
      padding: 16,
      borderRadius: 14,
      backgroundColor: theme.sendToBg,
      borderWidth: 1,
      borderColor: theme.sendToBorder,
    },
    title: {
      color: theme.sendToTitle,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    addRow: {
      flexDirection: 'row',
      marginTop: 12,
      marginBottom: 8,
      overflow: 'hidden',
    },
    listContainer: {
      paddingRight: 8,
    },
    addButton: {
      alignItems: 'center',
      marginRight: 24,
    },
    plus: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: BASE_COLORS.blueRibbon,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemWrapper: {
      alignItems: 'center',
      marginRight: 20,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    itemSelected: {
      borderColor: BASE_COLORS.blueRibbon,
    },
    name: {
      color: theme.sendToName,
      fontSize: 11,
      lineHeight: 15,
      marginTop: 4,
    },
    noItems: {
      textAlign: 'center',
      paddingVertical: 20,
    },
  });
};
