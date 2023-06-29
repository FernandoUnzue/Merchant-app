import { FC, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { ThemeContext, useThemedStyles } from '@core/theme';

/**
 * Types
 */

interface LoginFooterProps {
  containerStyle?: ViewStyle;
  children?: ReactNode;
}

/**
 * LoginFooter
 */

export const LoginFooter: FC<LoginFooterProps> = ({
  children,
  containerStyle,
}) => {
  const style = useThemedStyles(styles);

  return <View style={[style.container, containerStyle]}>{children}</View>;
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bgLoginFooter,
      flex: 1,
      alignSelf: 'stretch',
    },
  });
