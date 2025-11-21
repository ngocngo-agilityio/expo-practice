import { StyleSheet } from 'react-native';

// Themes
import { BASE_COLORS, colors, fontFamilies } from '@/themes';

// Types
import { TThemeScheme } from '@/types';

export const createAddRecipientModalStyles = (scheme: TThemeScheme) => {
  const theme = colors[scheme];

  return StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.modalOverlay,
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: theme.pickerModalIOSContainer,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      maxHeight: '90%',
      paddingBottom: 40,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
    },
    modalTitle: {
      fontFamily: fontFamilies.primary.semiBold,
      color: theme.appHeaderTitle,
      flex: 1,
      textAlign: 'center',
    },
    closeButton: {
      padding: 4,
    },
    modalBody: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    modalFooter: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingTop: 16,
      gap: 16,
    },
    cancelButton: {
      flex: 1,
      borderWidth: 1,
      borderColor: BASE_COLORS.icewindDale,
      backgroundColor: 'transparent',
    },
    cancelButtonText: {
      color: theme.appHeaderTitle,
    },
    submitButton: {
      flex: 1,
    },
  });
};
