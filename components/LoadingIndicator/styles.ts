// Styles
import { StyleSheet } from 'react-native';

// Themes
import { colors } from '@/themes';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.loadingIndicatorBg,
    zIndex: 9999,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
  },
});
