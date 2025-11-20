import { StyleSheet } from 'react-native';

// Constants

// Types
import { TThemeScheme } from '@/types';

// Themes
import { colors, fontFamilies } from '@/themes';

export const createAmountInputStyles = (scheme: TThemeScheme) => {
  const theme = colors[scheme];

  return StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 29,
      paddingHorizontal: 16,
      borderRadius: 14,
      backgroundColor: theme.amountInputBg,
      borderWidth: 1,
      borderColor: theme.amountInputBorder,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 19,
    },
    label: {
      fontSize: 11,
      lineHeight: 15,
      color: theme.amountInputLabel,
    },
    changeCurrency: {
      fontSize: 11,
      lineHeight: 15,
      color: colors.amountInputChangeCurrency,
    },
    amountRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    currency: {
      lineHeight: 32,
      fontFamily: fontFamilies.primary.semiBold,
      marginRight: 16,
      color: theme.amountInputCurrency,
    },
    input: {
      flex: 1,
      fontSize: 24,
      lineHeight: 32,
      padding: 0,
      fontFamily: fontFamilies.primary.semiBold,
      color: theme.amountInputText,
    },
  });
};
