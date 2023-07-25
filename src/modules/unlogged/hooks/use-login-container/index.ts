import { StyleProp, StyleSheet, useWindowDimensions } from 'react-native';

import { ThemeContext, useThemedStyles } from '@core/theme';

const FORM_WINDOW_HEIGHT_RATIO = 0.483;

export const useLoginContainer = (): StyleProp<any> => {
  const { height: windowHeigth } = useWindowDimensions();

  return useThemedStyles(({ theme }: ThemeContext) =>
    StyleSheet.create({
      container: {
        height: windowHeigth * FORM_WINDOW_HEIGHT_RATIO,
        backgroundColor: theme.colors.background,
      },
    }),
  );
};
