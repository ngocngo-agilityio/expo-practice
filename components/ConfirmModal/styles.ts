// Libs
import { StyleSheet } from 'react-native';

// Types
import { TThemeScheme } from '@/types';

// Themes
import { BASE_COLORS, colors, fontFamilies } from '@/themes';

export const createModalStyles = (scheme: TThemeScheme) => {
  const theme = colors[scheme];

  return StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.modalOverlay,
    },
    modalContainer: {
      maxWidth: 320,
      width: '85%',
      paddingTop: 28,
      paddingBottom: 4,
      backgroundColor: theme.modalBg,
      borderRadius: 20,
      alignItems: 'center',
      shadowColor: BASE_COLORS.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 11,
    },
    modalTitle: {
      textAlign: 'center',
      marginBottom: 12,
    },
    modalText: {
      color: theme.confirmModalText,
      textAlign: 'center',
    },
    confirmButton: {
      width: '100%',
      paddingVertical: 16,
      alignItems: 'center',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: theme.confirmModalLine,
    },
    confirmText: {
      color: BASE_COLORS.neonFuchsia,
      fontFamily: fontFamilies.primary.medium,
    },
    cancelButton: {
      width: '100%',
      marginTop: 6,
      paddingVertical: 16,
      alignItems: 'center',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: theme.confirmModalLine,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
  });
};
