import { RootState, store } from '@core/redux/store';
import { createContext, FC, ReactNode, useContext, useEffect } from 'react';
import { StyleProp } from 'react-native';
import { useSelector } from 'react-redux';

import {
  Colors,
  ColorsGeneralDark,
  ColorsGeneralLight,
  ColorsLight,
  ColorsType,
  ColorsTypeNew,
} from './colors';
import { Fonts, FontsType } from './fonts';

export interface ThemeContext {
  theme: {
    colors: ColorsTypeNew;
    fonts: FontsType;
  };
}

const isDarkTheme = (): boolean => {
  const state: RootState = store.getState();
  console.log(state.auth.darkMode);
  return !!state.auth.darkMode;
};

export const themeContent: ThemeContext = {
  theme: {
    colors: { ...ColorsLight, ...ColorsGeneralLight },
    fonts: Fonts,
  },
};

export const themeContentDark: ThemeContext = {
  theme: {
    colors: { ...Colors, ...ColorsGeneralDark },
    fonts: Fonts,
  },
};

export const ThemeContext = createContext(themeContent);

export const ThemeContextDark = createContext(themeContentDark);

export const ThemeProvider: FC<{
  children: ReactNode;
  theme: ThemeContext;
}> = ({ children, theme }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const useThemedStyles = (
  styles: ({ theme }: ThemeContext) => StyleProp<any>,
) => styles(useTheme());
