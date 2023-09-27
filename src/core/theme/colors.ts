import { useColorScheme } from 'react-native';
import { palette } from './palette';
import { paletteNew } from './palette';

export const ColorsLight = {
  black: palette.black,
  white: palette.white,
  grey: palette.grey,
  btnPrimary: palette.white,
  btnSecondary: palette.pluto,
  btnTertiary: palette.carbon,
  btnQuaternary: palette.rainWater,
  btnQuaternaryShadow: palette.pluto,
  btnDisabled: palette.snowBank,
  dotActive: palette.rainWater,
  bgLoginBody: palette.white,
  bgLoginFooter: palette.rainWater,
  text: palette.darkNight,
  textSecondary: palette.whiteOut,
  textTertiary: palette.nightShift,
  textQuaternary: palette.pluto,
  textQuintiary: palette.blackHowl,
  textSextiary: palette.wildDove,
  textSeptuary: palette.cobaltNight,
  textOctuary: palette.skylla,
  textGrey: palette.ellieGrey,
  textDisabled: palette.tin,
  textDisabledSecondary: palette.silverMedal,
  accent: palette.rainWater,
  inputBorder: palette.kinglyCloud,
  success: palette.pluto,
  warning: palette.barcelonaOrange,
  darkGrey: palette.darkGrey,
  hightLight: palette.hightLight,
  backgroundDark: palette.white
};

export const generalColorsNew = {
  accent: paletteNew.blackPrimary,
  textBlack: paletteNew.blackPrimary,
  textGrey: paletteNew.greyNew,
  backgroundNew: paletteNew.lightGreyNew,
  orange: paletteNew.orangeNew,
  greenLight: paletteNew.lightGreen,
  greenDark: paletteNew.darkGreen,
  darkPurple: paletteNew.darkPurple
}


export const ColorsGeneralLight = {
  background: paletteNew.lightGreyNew,
  backgroundNegative: palette.blueBack,
  textPrimary: palette.black,
  textSecondary: palette.blackHowl,
  textNegative: palette.white,
  btnPrimary: palette.snowBank,
  btnSecondary: palette.carbon,
  textDisabled: palette.tin,
  btnQuaternaryShadow: palette.pluto,
  btnDisabled: palette.snowBank,
  btnQuaternary: palette.rainWater,
  textSeptuary: palette.cobaltNight,
  ...generalColorsNew
}




export const ColorsGeneralDark = {
  background: palette.blueBack,
  backgroundNegative: paletteNew.lightGreyNew,
  textPrimary: palette.white,
  textSecondary: palette.ellieGrey,
  textNegative: palette.darkNight,
  btnPrimary: palette.blackHowl,
  btnSecondary: palette.carbon,
  textDisabled: palette.tin,
  btnQuaternaryShadow: palette.pluto,
  btnDisabled: palette.snowBank,
  btnQuaternary: palette.rainWater,
  textSeptuary: palette.cobaltNight,
  ...generalColorsNew
}

export const Colors = {
  black: palette.black,
  white: palette.white,
  grey: palette.grey,
  btnPrimary: palette.white,
  btnSecondary: palette.pluto,
  btnTertiary: palette.carbon,
  btnQuaternary: palette.rainWater,
  btnQuaternaryShadow: palette.pluto,
  btnDisabled: palette.snowBank,
  dotActive: palette.rainWater,
  bgLoginBody: palette.white,
  bgLoginFooter: palette.rainWater,
  text: palette.darkNight,
  textSecondary: palette.whiteOut,
  textTertiary: palette.nightShift,
  textQuaternary: palette.pluto,
  textQuintiary: palette.blackHowl,
  textSextiary: palette.wildDove,
  textSeptuary: palette.cobaltNight,
  textOctuary: palette.skylla,
  textGrey: palette.ellieGrey,
  textDisabled: palette.tin,
  textDisabledSecondary: palette.silverMedal,
  accent: palette.rainWater,
  inputBorder: palette.kinglyCloud,
  success: palette.pluto,
  warning: palette.barcelonaOrange,
  darkGrey: palette.darkGrey,
  hightLight: palette.hightLight,
  backgroundDark: palette.blueBack
};

export type ColorsTypeNew = typeof ColorsGeneralLight;

export type ColorsType = typeof Colors;

export type KeyColors = keyof ColorsType;
