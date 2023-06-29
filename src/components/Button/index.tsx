import { FC } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { ShowIf } from '@components/ShowIf';

/**
 * Types
 */

type ButtonTypes =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'quaternarySec';

export interface ButtonProps extends PressableProps {
  /** Text to be read by Voice Assistant when user taps the button. */
  accessibilityLabel: string;
  /** Text to be displayed inside button. */
  title: string;
  /** Diferent types for button ; */
  type: ButtonTypes;
  /** Disabled Button */
  disabled?: boolean;
  /** Timer value */
  timer?: string;
  /** If true, disable all interactions for this component and replace the title with an ActivityIndicator. */
  loading?: boolean;
  /** Selected button */
  selected?: boolean;
  /** Action function. */
  onPress: () => void;

  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  stylesTitle?: TextStyle;
}

/**
 * Constants
 */

const TIMER_ZERO_VALUE = '00';

/**
 * Button
 */

export const Button: FC<ButtonProps> = ({
  onPress,
  title,
  accessibilityLabel,
  loading,
  type,
  disabled,
  timer,
  testID,
  icon,
  selected,
  iconRight,
  stylesTitle,
  ...props
}) => {
  const style = useThemedStyles(styles);

  return (
    <>
      <Pressable
        {...props}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={disabled ? 'disabilitato' : undefined}
        disabled={disabled || loading || selected}
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [
          style.buttonBase,
          disabled ? style.btnDisabled : style[`button_${type}`],
          {
            opacity: pressed ? 0.8 : 1,
          },
        ]}>
        {icon && <View style={style.iconCont}>{icon}</View>}
        {loading ? (
          <ActivityIndicator color={style[`text_${type}.color`]} />
        ) : (
          <Text
            style={[
              style.textBase,
              disabled ? style.textDisabled : style[`text_${type}`],
              stylesTitle,
            ]}>
            {title}
          </Text>
        )}
        {iconRight && <View style={style.iconCont2}>{iconRight}</View>}
      </Pressable>
      <ShowIf condition={type === 'quaternary'}>
        <Pressable
          style={({ pressed }) => [
            disabled ? style.btnDisabled : style.btnBottomBorder,
            {
              opacity: pressed ? 0 : 1,
            },
          ]}
        />
      </ShowIf>
      <ShowIf condition={!!timer && timer !== TIMER_ZERO_VALUE}>
        <View style={style.timerWrapper}>
          <Text style={style.timer}>({timer}s)</Text>
        </View>
      </ShowIf>
    </>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    buttonBase: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      width: '100%',
      height: 60,
      zIndex: 4,
      flexDirection: 'row',
    },
    buttonBaseWithIcon: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      width: '100%',
      height: 60,
      zIndex: 4,
      flexDirection: 'row',
    },
    iconCont: {
      padding: 10,
      alignItems: 'flex-start',
      alignSelf: 'flex-start',

      width: 90,
    },
    iconCont2: {
      padding: 20,
      alignItems: 'flex-end',
      alignSelf: 'flex-end',
      width: 50,
    },
    button_primary: {
      backgroundColor: theme.colors.btnPrimary,
    },
    button_secondary: {
      backgroundColor: theme.colors.btnSecondary,
    },
    button_tertiary: {
      backgroundColor: theme.colors.btnPrimary,
      borderWidth: 1,
      borderColor: theme.colors.text,
    },
    button_quaternarySec: {
      backgroundColor: theme.colors.btnPrimary,
      borderWidth: 2,
      borderColor: theme.colors.accent,
    },
    button_quaternary: {
      backgroundColor: theme.colors.btnQuaternary,
    },
    btnDisabled: {
      backgroundColor: theme.colors.btnDisabled,
    },
    btnBottomBorder: {
      marginTop: -5,
      height: 10,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      backgroundColor: theme.colors.btnQuaternaryShadow,
      zIndex: 1,
    },
    textBase: {
      textTransform: 'uppercase',
      fontFamily: theme.fonts.bold,
      fontSize: 20,
    },
    text_primary: {
      color: theme.colors.text,
    },
    text_secondary: {
      color: theme.colors.textSecondary,
    },
    text_tertiary: {
      color: theme.colors.text,
    },
    text_quaternary: {
      textTransform: 'capitalize',
      color: theme.colors.textSeptuary,
    },
    text_quaternarySec: {
      color: theme.colors.textSeptuary,
      textTransform: 'none',
    },
    textDisabled: {
      color: theme.colors.textDisabled,
    },
    timerWrapper: {
      position: 'absolute',
      right: 80,
      top: 20,
    },
    timer: {
      color: theme.colors.text,
      fontFamily: theme.fonts.bold,
      fontSize: 13,
    },
  });
