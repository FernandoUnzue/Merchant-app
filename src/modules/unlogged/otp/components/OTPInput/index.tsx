import { useCallback } from 'react';
import {
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Control,
  Controller,
  Path,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { ShowIf } from '@components/ShowIf';
import { ValidationValues } from '@modules/unlogged/otp/screens/otp-validation';
import { NUMBERS_REGEX } from '@core/constants';

/**
 * Types
 */

interface OTPInputProps<ContentType> extends TextInputProps {
  control: Control<ContentType, object>;
  name: Path<ContentType>;
  register: UseFormRegister<ValidationValues>;
  setValue: UseFormSetValue<ValidationValues>;
}

/**
 * Constants
 */

const INPUT_LENGTH = 5;
// ignore space, comma, hyphen, point:
const IGNORE_CHAR_CODES = [32, 44, 45, 46];
const BULLET_POINT = '\u2022';

/**
 * OTPInput
 */

export function OTPInput<ContentType>({
  control,
  name,
  register,
  setValue,
  ...otherProps
}: OTPInputProps<ContentType>) {
  const style = useThemedStyles(styles);

  const code = useWatch({
    control,
    name,
  });

  const inputRef = useBlurOnFulfill({
    value: code as string,
    cellCount: INPUT_LENGTH,
  });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code as string,
    setValue: () => setValue(name as keyof ValidationValues, code as string),
  });

  const isValidCharacter = (char: string): boolean =>
    !IGNORE_CHAR_CODES.includes(char.charCodeAt(char.length - 1));

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() =>
        inputRef.current?.focus(),
      );
      return () => task.cancel();
    }, [inputRef]),
  );

  return (
    <View style={style.wrapper}>
      <View style={style.codeFieldWrapper}>
        <Controller
          control={control}
          name={name}
          rules={{
            minLength: INPUT_LENGTH,
            maxLength: INPUT_LENGTH,
            pattern: NUMBERS_REGEX,
          }}
          render={({ field: { value, onChange } }) => {
            return (
              <CodeField
                ref={inputRef}
                {...props}
                value={value as string}
                cellCount={INPUT_LENGTH}
                keyboardType="numeric"
                textContentType="oneTimeCode"
                onChangeText={(char: string) => {
                  if (isValidCharacter(char)) {
                    return onChange(char);
                  }
                  return;
                }}
                accessibilityLabel="codice di verifica"
                renderCell={({ index, symbol, isFocused }) => (
                  <View key={index} style={style.cellWrapper}>
                    <TextInput
                      style={style.cell}
                      onLayout={getCellOnLayoutHandler(index)}
                      {...register('code')}
                      {...otherProps}>
                      {symbol || (isFocused && <Cursor />)}
                    </TextInput>
                    <ShowIf condition={index < INPUT_LENGTH - 1}>
                      <Text style={style.point}>{BULLET_POINT}</Text>
                    </ShowIf>
                  </View>
                )}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 12,
      height: 40,
    },
    codeFieldWrapper: {
      alignSelf: 'center',
    },
    cellWrapper: {
      flexDirection: 'row',
    },
    cell: {
      color: theme.colors.text,
      fontSize: Platform.OS === 'android' ? 24 : 28,
      paddingBottom: 0,
      margin: 2,
      height: 44,
      width: 40,
      textAlign: 'center',
      borderRadius: 4.2,
      borderWidth: 1,
      borderColor: theme.colors.text,
      fontFamily: theme.fonts.regular,
    },
    point: {
      fontSize: 24,
      color: theme.colors.text,
      fontFamily: theme.fonts.regular,
      alignSelf: 'center',
    },
  });
