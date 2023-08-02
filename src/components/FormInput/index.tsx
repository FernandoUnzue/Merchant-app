import { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Pressable,
  Keyboard,
  ViewStyle,
  Image,
} from 'react-native';
import { Control, Controller, Path } from 'react-hook-form';
import Clipboard from '@react-native-community/clipboard';

import { ThemeContext, useThemedStyles } from '@core/theme';

import { ShowIf } from '@components/ShowIf';

import SvgComponent from '@core/theme/warning';
import CheckIcon from '@core/theme/SVGS/Movements/Check';
import WarningIcon from '@core/theme/SVGS/WarningIcon';
import EyeOpenIcon from '@core/theme/Merchant/EyeOpen';
import EyeClosedIcon from '@core/theme/Merchant/EyeClosed';

/**
 * Types
 */

interface IFormInput<ContentType> extends TextInputProps {
  control: any;
  name: Path<ContentType>;
  rules?: {};
  fixed?: boolean;
  disablePaste?: boolean;
  okMessage?: string;
  errorMessage?: string;
  onPasswordMessagePressed?: () => void;
  passValue?: string;
  confirmPass?: boolean;
  confirmEmail?: boolean;
  styless?: ViewStyle;
  showIcons?: boolean;
  negativeColor?: boolean;
}

/**
 * FormInput
 */

export function FormInput<ContentType>({
  control,
  name,
  rules = {},
  fixed = false,
  disablePaste = false,
  okMessage,
  errorMessage,
  passValue,
  confirmEmail = false,
  confirmPass = false,
  showIcons = true,
  negativeColor = false,
  styless,
  onPasswordMessagePressed,
  ...props
}: IFormInput<ContentType>) {
  const style = useThemedStyles(styles);
  const isPassword = name.toLowerCase().includes('password');
  const [showPassword, setShowPassword] = useState(false);

  const onEyeIconPress = () => setShowPassword(state => !state);

  const resetClipboard = useCallback(() => Clipboard.setString(''), []);

  const errorGeneric = () => {
    if (name === 'phone') {
      return 'Inserire 1 numero valido';
    }
    return 'Error';
  };
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
          <View
            style={{
              ...style[`${negativeColor ? 'containerNegative' : 'container'}`],
              ...styless,
            }}>
            <TextInput
              value={value as string}
              selectionColor={negativeColor ? '#fff' : '#000'}
              placeholderTextColor={negativeColor ? '#fff' : '#000'}
              onChangeText={onChange}
              onBlur={onBlur}
              onFocus={() => disablePaste && resetClipboard()}
              onSelectionChange={() => disablePaste && resetClipboard()}
              onSubmitEditing={Keyboard.dismiss}
              style={[
                style[`${negativeColor ? 'inputNegative' : 'input'}`],
                fixed
                  ? style.fixedInput
                  : style[
                      `${
                        negativeColor
                          ? 'editableInputNegative'
                          : 'editableInput'
                      }`
                    ],
                { height: props.multiline ? 150 : 50 },
              ]}
              editable={!fixed}
              secureTextEntry={isPassword && !showPassword}
              {...props}
            />
            <ShowIf condition={isPassword}>
              <Pressable
                style={style.icon}
                hitSlop={5}
                onPress={onEyeIconPress}>
                {showPassword ? (
                  <EyeOpenIcon
                    size={20}
                    color={negativeColor ? '#fff' : '#000'}
                  />
                ) : (
                  <EyeClosedIcon
                    size={20}
                    color={negativeColor ? '#fff' : '#000'}
                  />
                )}
              </Pressable>
            </ShowIf>
            <ShowIf condition={(isDirty || fixed) && showIcons}>
              <View style={style.icon}>
                {!error || fixed ? (
                  <CheckIcon size={20} />
                ) : (
                  <WarningIcon size={20} />
                  // <SvgComponent />
                )}
              </View>
            </ShowIf>
          </View>
          <View style={style.errorWrapper}>
            <ShowIf condition={onPasswordMessagePressed && !error}>
              <Text
                style={
                  style[`${negativeColor ? 'messageNegative' : 'message'}`]
                }
                onPress={onPasswordMessagePressed}
                suppressHighlighting>
                Regole di creazione password
              </Text>
            </ShowIf>
            <ShowIf condition={onPasswordMessagePressed && !!error}>
              <Text>
                <Text
                  style={
                    style[
                      `${
                        negativeColor ? 'errorMessageNegative' : 'errorMessage'
                      }`
                    ]
                  }>
                  La password non rispetta i{' '}
                </Text>
                <Text
                  style={
                    style[
                      `${negativeColor ? 'errorLinkNegative' : 'errorLink'}`
                    ]
                  }
                  onPress={onPasswordMessagePressed}
                  suppressHighlighting>
                  requisiti
                </Text>
              </Text>
            </ShowIf>
            <ShowIf condition={passValue !== value && confirmPass && !!error}>
              <Text>
                <Text
                  style={
                    style[
                      `${
                        negativeColor ? 'errorMessageNegative' : 'errorMessage'
                      }`
                    ]
                  }>
                  La password non corrisponde
                </Text>
              </Text>
            </ShowIf>
            <ShowIf condition={passValue !== value && confirmEmail && !!error}>
              <Text>
                <Text
                  style={
                    style[
                      `${
                        negativeColor ? 'errorMessageNegative' : 'errorMessage'
                      }`
                    ]
                  }>
                  Le email non corrispondono
                </Text>
              </Text>
            </ShowIf>
            <ShowIf
              condition={
                !!okMessage?.length && isDirty && !error && !errorMessage
              }>
              <Text
                style={
                  style[
                    `${negativeColor ? 'errorMessageNegative' : 'errorMessage'}`
                  ]
                }>
                {okMessage}
              </Text>
            </ShowIf>
            <ShowIf condition={!isPassword && (!!error || !!errorMessage)}>
              <Text
                style={
                  style[
                    `${negativeColor ? 'errorMessageNegative' : 'errorMessage'}`
                  ]
                }>
                {error?.message || errorMessage || errorGeneric()}
              </Text>
            </ShowIf>
          </View>
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
      backgroundColor: theme.colors.background,
      width: '100%',
      borderBottomColor: theme.colors.textPrimary,
      borderBottomWidth: 1,
    },
    containerNegative: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.backgroundNegative,
      width: '100%',
      borderBottomColor: theme.colors.textNegative,
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
    inputNegative: {
      flex: 1,
      marginBottom: -8,
      marginLeft: -4,
      paddingHorizontal: 5,
      fontSize: 14,
      color: theme.colors.textNegative,
    },
    editableInput: {
      fontFamily: theme.fonts.regular,
      color: theme.colors.textPrimary,
    },
    editableInputNegative: {
      fontFamily: theme.fonts.regular,
      color: theme.colors.textNegative,
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
      color: theme.colors.textSecondary,
    },
    placeholderNegative: {
      color: theme.colors.textNegative,
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
    messageNegative: {
      fontSize: 11,
      color: theme.colors.textNegative,
      alignSelf: 'stretch',
      fontWeight: 'bold',
    },
    errorMessage: {
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      color: theme.colors.textPrimary,
      alignSelf: 'stretch',
    },
    errorMessageNegative: {
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      color: theme.colors.textNegative,
      alignSelf: 'stretch',
    },
    errorLink: {
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      color: theme.colors.textPrimary,
      alignSelf: 'stretch',
    },
    errorLinkNegative: {
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      color: theme.colors.textNegative,
      alignSelf: 'stretch',
    },
  });
