// Libs
import { StyleSheet } from 'react-native';

// Themes
import { colors, fontFamilies } from '@/themes';

// Types
import { TThemeScheme } from '@/types';

export const createEditProfileStyles = (scheme: TThemeScheme) => {
  const theme = colors[scheme];

  return StyleSheet.create({
    container: {
      width: '100%',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    name: {
      fontFamily: fontFamilies.primary.medium,
      color: theme.editProfileName,
      fontSize: 17,
      lineHeight: 20,
      marginTop: 22,
      textAlign: 'center',
    },
    position: {
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 30,
    },
    submitBtn: {
      marginTop: 10,
      marginBottom: 30,
    },
    startAt: {
      color: colors.signUpFooterText,
      textAlign: 'center',
    },
  });
};
