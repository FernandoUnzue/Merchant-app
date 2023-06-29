import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { Button, ButtonProps } from '@components/Button';

/**
 * WhiskeredButton
 */

export const WhiskeredButton: FC<ButtonProps> = ({
  accessibilityLabel,
  title,
  type,
  onPress,
  ...props
}) => {
  const style = useThemedStyles(styles);

  return (
    <View style={style.container}>
      <View style={style.whiskerWrapper}>
        <View style={style.whiskerTop} />
        <View style={style.whiskerBottom} />
      </View>
      <View style={style.buttonWrapper}>
        <Button
          accessibilityLabel={accessibilityLabel}
          title={title}
          type={type}
          onPress={onPress}
          {...props}
        />
      </View>
    </View>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    whiskerWrapper: {
      width: '100%',
    },
    whiskerTop: {
      height: 30,
      backgroundColor: theme.colors.white,
    },
    whiskerBottom: {
      height: 30,
      backgroundColor: theme.colors.bgLoginFooter,
    },
    buttonWrapper: {
      position: 'absolute',
      left: 0,
      right: 0,
      paddingHorizontal: 60,
    },
  });
