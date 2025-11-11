// Libs
import { StyleSheet } from 'react-native';

// Themes
import { colors, fontFamilies, fontSizes, fontWeights } from '@/themes';

// Types
import { TThemeScheme } from '@/types';

export const createInputStyles = (scheme: TThemeScheme) => {
  return StyleSheet.create({
    container: {
      marginBottom: 20,
      minHeight: 95,
    },
    label: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.normal,
      fontFamily: fontFamilies.primary.regular,
      color: colors.label,
      marginBottom: 5,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1.5,
      borderColor: colors[scheme].inputBorder,
    },
    inputWrapperError: {
      borderColor: colors.error,
    },
    input: {
      flex: 1,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.normal,
      fontFamily: fontFamilies.primary.regular,
      color: colors[scheme].inputText,
      paddingVertical: 10,
    },
    leftIconContainer: {
      paddingRight: 16,
      paddingLeft: 4,
      backgroundColor: 'transparent',
      elevation: 0,
    },
    rightIconContainer: {
      paddingLeft: 10,
      paddingRight: 4,
      backgroundColor: 'transparent',
      elevation: 0,
    },
    error: {
      position: 'absolute',
      top: 80,
      fontSize: fontSizes.xs,
      fontFamily: fontFamilies.primary.regular,
      color: colors.error,
      paddingLeft: 4,
    },
  });
};
