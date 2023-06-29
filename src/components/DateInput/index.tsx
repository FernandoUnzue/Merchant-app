import { ReactNode, useState } from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import { Control, Controller, Path } from 'react-hook-form';
import DatePicker from 'react-native-date-picker';

import { ThemeContext, useThemedStyles, Colors } from '@core/theme';
import { useIsDarkMode } from '@core/hooks';
import { ITALY_DATE_FORMAT } from '@core/constants';
import dayjs from '@core/helpers/dayjs';
import WarningIcon from '@core/theme/SVGS/WarningIcon';

/**
 * Types
 */

interface IDateInput<ContentType> {
  control: Control<ContentType, object>;
  name: Path<ContentType>;
  rules?: {};
  placeholder: string;
  width?: number | string;
  backColor?: string;
  minDate?: string;
  maxDate?: string;
  mode?: 'date' | 'time' | 'datetime';
  defaultDate?: string;
  icon?: ReactNode;
  error?: boolean;
  disabled?: boolean;
  errorMessage?: string;
}

/**
 * Constants
 */

const DEFAULT_DATE = dayjs('1970-01-01').toDate();
const MIN_DATE = dayjs('1920-01-01').toDate();
const MAX_DATE = dayjs().toDate();

/**
 * DateInput
 */

export function DateInput<ContentType>({
  control,
  name,
  rules = {},
  placeholder,
  width = '100%',
  backColor = '#fff',
  minDate,
  maxDate,
  defaultDate,
  mode,
  icon,
  error,
  disabled = false,
  errorMessage,
}: IDateInput<ContentType>) {
  const isDarkMode = useIsDarkMode();
  const style = useThemedStyles(styles);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const renderIcon = (
    error: boolean | undefined,
    icon: ReactNode,
  ): ReactNode | null => {
    if (error) return <WarningIcon size={10} />;

    if (!error && icon) return icon;

    return null;
  };
  const DEFAULT_DATE = defaultDate
    ? dayjs(defaultDate).toDate()
    : dayjs('1970-01-01').toDate();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <>
          <Pressable
            style={{
              ...style.container,
              width: width,
              backgroundColor: backColor,
            }}
            onPress={disabled ? () => null : () => setShowDatePicker(true)}>
            <Text style={{ ...style.input, color: disabled ? '#ddd' : '#000' }}>
              {value
                ? dayjs(value as string)
                    .format(ITALY_DATE_FORMAT)
                    .toString()
                : placeholder}
            </Text>
            {error && (
              <WarningIcon
                size={20}
                styles={{ marginRight: 5 }}
                color={Colors.black}
              />
            )}
            {icon && icon}
          </Pressable>
          {error && errorMessage && (
            <View>
              <Text style={style.warning}>{errorMessage}</Text>
            </View>
          )}
          <DatePicker
            modal
            mode={mode ? mode : 'date'}
            locale="it"
            textColor={isDarkMode ? '#fff' : undefined}
            open={showDatePicker}
            date={value ? dayjs(value as string).toDate() : DEFAULT_DATE}
            minimumDate={minDate ? dayjs(minDate as string).toDate() : MIN_DATE}
            maximumDate={maxDate ? dayjs(maxDate as string).toDate() : MAX_DATE}
            androidVariant="nativeAndroid"
            title="Scegli la data"
            confirmText="Conferma"
            cancelText="Cancella"
            onConfirm={date => {
              setShowDatePicker(false);
              onChange(date);
            }}
            onCancel={() => {
              setShowDatePicker(false);
            }}
          />
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
      borderBottomColor: theme.colors.text,
      borderBottomWidth: 1,
    },
    warning: {
      color: theme.colors.black,
      fontFamily: theme.fonts.bold,
      fontSize: 10,
    },
    input: {
      flex: 1,
      height: 30,
      paddingHorizontal: 5,
      fontFamily: theme.fonts.regular,
      fontSize: 15,
      color: theme.colors.text,
    },
  });
