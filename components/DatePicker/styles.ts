// Libs
import { StyleSheet } from 'react-native';

// Themes
import { colors, fontFamilies, fontSizes, fontWeights } from '@/themes';

// Types
import { TThemeScheme } from '@/types';

export const createDatePickerStyles = (scheme: TThemeScheme) => {
  return StyleSheet.create({
    container: {
      marginBottom: 20,
      minHeight: 95,
      position: 'relative',
    },
    label: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.normal,
      fontFamily: fontFamilies.primary.regular,
      color: colors.label,
      marginBottom: 5,
    },
    columns: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    column: { width: '30%' },
    columnText: {
      textAlign: 'center',
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.normal,
      fontFamily: fontFamilies.primary.regular,
      color: colors[scheme].inputText,
      paddingVertical: 10,
    },
    columnUnderline: {
      height: 1.5,
      backgroundColor: colors[scheme].inputBorder,
    },
    inputWrapperError: {
      backgroundColor: colors.error,
    },
    error: {
      position: 'absolute',
      top: 60,
      fontSize: fontSizes.xs,
      fontFamily: fontFamilies.primary.regular,
      color: colors.error,
      paddingLeft: 4,
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: colors.modalOverlay,
      justifyContent: 'center',
      padding: 20,
    },

    modalIOSContainer: {
      borderRadius: 16,
      padding: 16,
      backgroundColor: colors[scheme].pickerModalIOSContainer,
    },

    modalDoneButton: {
      paddingVertical: 10,
      alignItems: 'center',
    },

    modalDoneText: {
      fontSize: 16,
      color: colors.pickerModalDoneText,
      fontFamily: fontFamilies.primary.medium,
    },
  });
};
