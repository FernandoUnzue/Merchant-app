import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext, useThemedStyles } from '@core/theme';

/**
 * Types
 */

interface SeparatorProps {
  height?: number;
  color?: string;
}

/**
 * Separator
 */

export const Separator: FC<SeparatorProps> = ({ height, color }) => {
  const style = useThemedStyles(styles);

  return (
    <View
      style={[
        style.separator,
        {
          height,
          borderBottomWidth: height,
          borderBottomColor: color,
        },
      ]}
    />
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    separator: {
      height: 1,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.black,
    },
  });
