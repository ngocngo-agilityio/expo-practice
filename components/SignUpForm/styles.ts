// Libs
import { StyleSheet } from 'react-native';

// Themes
import { colors } from '@/themes';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  signUpBtn: {
    marginTop: 10,
    marginBottom: 30,
  },
  footerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: colors.signUpFooterText,
  },
  signIn: {
    color: colors.signUpNavigationText,
  },
});
