import { FC, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ThemeContext, useThemedStyles } from '@core/theme';

/**
 * Types
 */

interface CardProps {
  containerStyle?: ViewStyle;
  children?: ReactNode;
}

/**
 * Card
 */

export const Card: FC<CardProps> = ({ children, containerStyle }) => {
  const style = useThemedStyles(styles);

  return <View style={[style.container, containerStyle]}>{children}</View>;
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      borderRadius: 18,
      backgroundColor: theme.colors.white,
      marginHorizontal: '6%',
      paddingHorizontal: '10.5%',
      paddingVertical: '6%',
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.24,
      shadowRadius: 10,
      elevation: 8,
    },
  });
