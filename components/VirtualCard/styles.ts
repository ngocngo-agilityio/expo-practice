import { StyleSheet } from 'react-native';

// Themes
import { colors, fontFamilies } from '@/themes';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    borderRadius: 25,
    overflow: 'hidden',
    paddingVertical: 22,
    paddingHorizontal: 18,
    backgroundColor: colors.virtualCardBg,
    justifyContent: 'space-between',
  },

  bgImage: {
    resizeMode: 'cover',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
    marginBottom: 12,
  },

  cardNumber: {
    color: 'white',
    fontFamily: fontFamilies.secondary.regular,
    letterSpacing: 1,
  },

  holderName: {
    color: 'white',
    fontSize: 13,
    lineHeight: 15,
    fontFamily: fontFamilies.secondary.regular,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  infoBlock: {
    marginLeft: 22,
  },

  label: {
    color: colors.virtualCardLabel,
    fontFamily: fontFamilies.secondary.regular,
  },

  infoValue: {
    color: 'white',
    fontSize: 13,
    lineHeight: 15,
    fontFamily: fontFamilies.secondary.regular,
    marginTop: 4,
  },

  brandContainer: {
    alignItems: 'center',
  },

  brandLogo: {
    width: 36,
    height: 22,
    marginBottom: 4,
  },

  brandText: {
    color: 'white',
    fontSize: 13,
    lineHeight: 15,
    fontFamily: fontFamilies.secondary.regular,
  },
});
