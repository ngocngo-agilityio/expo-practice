// Styles
import { StyleSheet } from 'react-native';

// Themes
import { colors, fontFamilies } from '@/themes';

// Types
import { TThemeScheme } from '@/types';

export const createTransactionItemStyle = (scheme: TThemeScheme) => {
  const theme = colors[scheme];

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    iconWrapper: {
      width: 42,
      height: 42,
      borderRadius: 42 / 2,
      backgroundColor: theme.transactionItemAvatarBg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: 16,
      height: 16,
    },
    titleWrapper: {
      flexDirection: 'column',
      gap: 6,
    },
    title: {
      color: theme.transactionItemTitle,
      fontFamily: fontFamilies.primary.medium,
    },
    subtitle: {
      color: colors.transactionItemSubTitle,
    },
    amount: {
      color: theme.transactionItemAmount,
      fontFamily: fontFamilies.primary.medium,
    },
  });
};
