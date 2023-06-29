import { palette } from './palette';

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
  hightLight: palette.hightLight
};

export type ColorsType = typeof Colors;
export type KeyColors = keyof ColorsType;
