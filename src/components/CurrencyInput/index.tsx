import { useCallback } from 'react';
import {
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Text,
  Keyboard,
} from 'react-native';
import { Control, Controller, Path } from 'react-hook-form';
import Clipboard from '@react-native-community/clipboard';

import { ThemeContext, useThemedStyles } from '@core/theme';
import CurrencyInput from 'react-native-currency-input';
import { ShowIf } from '@components/ShowIf';
import CheckIcon from '@core/theme/SVGS/Movements/Check';
import WarningIcon from '@core/theme/SVGS/WarningIcon';
import { TextStyle } from 'react-native';

/**
 * Types
 */

interface IFormInput<ContentType> extends TextInputProps {
  control: Control<ContentType, object>;
  name: Path<ContentType>;
  rules?: {};
  disabled?: boolean;
  icon?: boolean;
  disablePaste?: boolean;
  styless?: ViewStyle;
  errorMessagesStyles?: TextStyle;
}

/**
 * FormInput
 */

export function CurrencyFormInput<ContentType>({
  control,
  name,
  icon = true,
  rules = {},
  disabled = false,
  disablePaste = false,
  errorMessagesStyles,
  styless,
  ...props
}: IFormInput<ContentType>) {
  const style = useThemedStyles(styles);

  const resetClipboard = useCallback(() => Clipboard.setString(''), []);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { isDirty, error },
      }) => (
        <>
          <View style={{ ...style.container, ...styless }}>
            <CurrencyInput
              value={value}
              onChangeValue={onChange}
              style={[
                style.input,
                disabled ? style.fixedInput : style.editableInput,
                { height: props.multiline ? 150 : 50 },
              ]}
              prefix="€"
              delimiter="."
              maxValue={20000}
              separator=","
              precision={2}
              onBlur={onBlur}
              onFocus={() => disablePaste && resetClipboard()}
              onSelectionChange={() => disablePaste && resetClipboard()}
              onSubmitEditing={Keyboard.dismiss}
              editable={!disabled}
              {...props}
            />
            <ShowIf condition={icon}>
              <ShowIf condition={isDirty || disabled}>
                <View style={style.icon}>
                  {!error || disabled ? (
                    <CheckIcon size={20} />
                  ) : (
                    <WarningIcon size={20} />
                    // <SvgComponent />
                  )}
                </View>
              </ShowIf>
            </ShowIf>
          </View>
          <ShowIf condition={!!error}>
            <Text style={{ ...style.errorMessage, ...errorMessagesStyles }}>
              {error?.message}
            </Text>
          </ShowIf>
        </>
      )}
    />
  );
}

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      width: '100%',
      borderBottomColor: theme.colors.textPrimary,
      borderBottomWidth: 1,
    },
    input: {
      flex: 1,
      marginBottom: -8,
      marginLeft: -4,
      paddingHorizontal: 5,
      fontSize: 14,
      color: theme.colors.textPrimary,
    },
    editableInput: {
      fontFamily: theme.fonts.regular,
      color: theme.colors.textPrimary,
    },
    fixedInput: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.textDisabled,
    },
    icon: {
      marginLeft: 8,
      alignSelf: 'center',
    },
    placeholder: {
      color: theme.colors.textPrimary,
    },
    errorWrapper: {
      marginTop: 5,
      height: 20,
    },
    message: {
      fontSize: 11,
      color: theme.colors.textPrimary,
      alignSelf: 'stretch',
      fontWeight: 'bold',
    },
    errorMessage: {
      fontFamily: theme.fonts.bold,
      fontSize: 12,
      color: theme.colors.textPrimary,
      alignSelf: 'stretch',
    },
    errorLink: {
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      color: theme.colors.textPrimary,
      alignSelf: 'stretch',
    },
  });
