import { StyleProp, StyleSheet, useWindowDimensions } from 'react-native';

import { ThemeContext, useThemedStyles } from '@core/theme';

const FORM_WINDOW_HEIGHT_RATIO = 0.535;

export const useRegisterContainer = (): StyleProp<any> => {
  const { height: windowHeigth } = useWindowDimensions();

  return useThemedStyles(({ theme }: ThemeContext) =>
    StyleSheet.create({
      container: {
        height: windowHeigth * FORM_WINDOW_HEIGHT_RATIO,
        backgroundColor: theme.colors.white,
      },
    }),
  );
};
