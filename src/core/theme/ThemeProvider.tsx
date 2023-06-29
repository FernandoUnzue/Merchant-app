import { createContext, FC, ReactNode, useContext } from 'react';
import { StyleProp } from 'react-native';

import { Colors, ColorsType } from './colors';
import { Fonts, FontsType } from './fonts';

export interface ThemeContext {
  theme: {
    colors: ColorsType;
    fonts: FontsType;
  };
}

const themeContent: ThemeContext = {
  theme: {
    colors: Colors,
    fonts: Fonts,
  },
};

export const ThemeContext = createContext(themeContent);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={themeContent}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const useThemedStyles = (
  styles: ({ theme }: ThemeContext) => StyleProp<any>,
) => styles(useTheme());
