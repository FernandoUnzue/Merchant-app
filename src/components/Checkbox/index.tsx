import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { Control, Controller, Path } from 'react-hook-form';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { ShowIf } from '@components/ShowIf';
import { ReactNode } from 'react';

/**
 * Types
 */

interface ICheckbox<ContentType> {
  control: Control<ContentType, object>;
  name: Path<ContentType>;
  rules?: {};
  styless?: ViewStyle;
  symbol?: ReactNode;
  disabled?: boolean;
  borderColor?: string;
  parameter?: boolean;
  setValue?: (a: string, b: any) => void;
  nameParent?: string;
}

/**
 * Constants
 */

const CHECK_SYMBOL = '\u2713';

/**
 * Checkbox
 */

export function Checkbox<ContentType>({
  control,
  name,
  styless,
  symbol,
  disabled = false,
  rules = {},
  borderColor = '#000',
  parameter = false,
  setValue,
  nameParent,
}: ICheckbox<ContentType>) {
  const style = useThemedStyles(styles);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <Pressable
          style={{
            ...style.checkBox,
            ...styless,
            borderColor: disabled ? '#ddd' : borderColor,
          }}
          onPress={
            setValue && nameParent
              ? () => {
                  onChange(!value);
                  if (parameter) setValue(nameParent, value);
                }
              : () => onChange(!value)
          }
          disabled={disabled}>
          <ShowIf condition={value as boolean}>
            {symbol ? symbol : <Text style={style.symbol}>{CHECK_SYMBOL}</Text>}
          </ShowIf>
        </Pressable>
      )}
    />
  );
}

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    checkBox: {
      width: 20,
      height: 20,
      borderRadius: 4.2,
      borderWidth: 1,
      borderColor: theme.colors.text,
      justifyContent: 'center',
      alignItems: 'center',
    },
    symbol: {
      fontSize: 15,
      color: theme.colors.accent,
    },
  });
