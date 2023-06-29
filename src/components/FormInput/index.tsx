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

/**
 * Types
 */

interface IFormInput<ContentType> extends TextInputProps {
  control: Control<ContentType, object>;
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
          <View style={{ ...style.container, ...styless }}>
            <TextInput
              value={value as string}
              placeholderTextColor={style.placeholder.color}
              onChangeText={onChange}
              onBlur={onBlur}
              onFocus={() => disablePaste && resetClipboard()}
              onSelectionChange={() => disablePaste && resetClipboard()}
              onSubmitEditing={Keyboard.dismiss}
              style={[
                style.input,
                fixed ? style.fixedInput : style.editableInput,
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
                  <Image
                    source={require('../../../assets/images/icons/eye-open.svg')}
                    style={{ width: 20 }}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/images/icons/eye-closed.svg')}
                    style={{ width: 20 }}
                  />
                )}
              </Pressable>
            </ShowIf>
            <ShowIf condition={isDirty || fixed}>
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
                style={style.message}
                onPress={onPasswordMessagePressed}
                suppressHighlighting>
                Regole di creazione password
              </Text>
            </ShowIf>
            <ShowIf condition={onPasswordMessagePressed && !!error}>
              <Text>
                <Text style={style.errorMessage}>
                  La password non rispetta i{' '}
                </Text>
                <Text
                  style={style.errorLink}
                  onPress={onPasswordMessagePressed}
                  suppressHighlighting>
                  requisiti
                </Text>
              </Text>
            </ShowIf>
            <ShowIf condition={passValue !== value && confirmPass && !!error}>
              <Text>
                <Text style={style.errorMessage}>
                  La password non corrisponde
                </Text>
              </Text>
            </ShowIf>
            <ShowIf condition={passValue !== value && confirmEmail && !!error}>
              <Text>
                <Text style={style.errorMessage}>
                  Le email non corrispondono
                </Text>
              </Text>
            </ShowIf>
            <ShowIf
              condition={
                !!okMessage?.length && isDirty && !error && !errorMessage
              }>
              <Text style={style.errorMessage}>{okMessage}</Text>
            </ShowIf>
            <ShowIf condition={!isPassword && (!!error || !!errorMessage)}>
              <Text style={style.errorMessage}>
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
      backgroundColor: 'white',
      width: '100%',
      borderBottomColor: theme.colors.text,
      borderBottomWidth: 1,
    },
    input: {
      flex: 1,
      marginBottom: -8,
      marginLeft: -4,
      paddingHorizontal: 5,
      fontSize: 14,
      color: theme.colors.text,
    },
    editableInput: {
      fontFamily: theme.fonts.regular,
      color: theme.colors.text,
    },
    fixedInput: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.textGrey,
    },
    icon: {
      marginLeft: 8,
      alignSelf: 'center',
    },
    placeholder: {
      color: theme.colors.text,
    },
    errorWrapper: {
      marginTop: 5,
      height: 20,
    },
    message: {
      fontSize: 11,
      color: theme.colors.bgLoginFooter,
      alignSelf: 'stretch',
      fontWeight: 'bold',
    },
    errorMessage: {
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      color: theme.colors.text,
      alignSelf: 'stretch',
    },
    errorLink: {
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      color: theme.colors.accent,
      alignSelf: 'stretch',
    },
  });
