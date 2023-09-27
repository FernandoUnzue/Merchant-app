

export const FontsNew = {
  instRegular: 'InstrumentSans-Regular',
  instBold: 'InstrumentSans-Bold',
  instMedium: 'InstrumentSans-Medium',
  semiBold: 'InstrumentSans-SemiBold',
  condensedRegular: 'InstrumentSans_Condensed-Regular',
  condensedBold: 'InstrumentSans_Condensed-Bold',
  condensedMedium: 'InstrumentSans_Condensed-Medium',
  condensedSemiBold: 'InstrumentSans_Condensed-SemiBold',
  semiCondensedRegular: 'InstrumentSans_SemiCondensed-Regular',
  semiCondensedBold: 'InstrumentSans_SemiCondensed-Bold',
  semiCondenseMedium: 'InstrumentSans_SemiCondensed-Medium',
  semiCondenseSemiBold: 'InstrumentSans_SemiCondensed-SemiBold'

};

export const Fonts = {
  regular: 'Poppins-Regular',
  bold: 'Poppins-Bold',
  medium: 'Poppins-Medium',
  light: 'Poppins-Light',
  black: 'Poppins-Black',
  ...FontsNew
};

export type FontsTypeNew = typeof FontsNew;

export type FontsType = typeof Fonts;
