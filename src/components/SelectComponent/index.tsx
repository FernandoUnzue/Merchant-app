import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { ThemeContext, useThemedStyles } from '@core/theme';
import RNPickerSelect from 'react-native-picker-select';
import ArrowDown from '@core/theme/SVGS/ArrowDown';
import ArrowUp from '@core/theme/SVGS/ArrowUp';
import { Controller } from 'react-hook-form';
import WarningIcon from '@core/theme/SVGS/WarningIcon';

type Props = {
  control: any;
  name: string;
  rules?: Object;
  data: Array<any>;
  placeholder: string;
  icon?: ReactNode;
  styles?: ViewStyle;
  widthField?: number | string;
  backColor?: string;
  fontSize?: number;
  border?: boolean;
  stylesText?: TextStyle;
  error?: boolean;
  disabled?: boolean;
  defaultValue?: any;
};

const SelectComponent: React.FC<Props> = ({
  control,
  name,
  disabled = false,
  border = true,
  error,
  stylesText,
  fontSize,
  rules,
  data,
  placeholder,
  backColor,
  icon,
  styles,
  widthField,
  defaultValue,
}) => {
  const stylePicker = useThemedStyles(pickerSelectStyles);

  const renderIcon = (
    error: boolean | undefined,
    icon: ReactNode,
  ): ReactNode | null => {
    if (error)
      return () => <WarningIcon size={20} styles={{ marginTop: 10 }} />;

    if (!error && icon) return () => icon;

    return () => null;
  };
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <View
          style={{
            ...styles,
            width: widthField ? widthField : 60,
            height: 50,
            backgroundColor: backColor ? backColor : '#fff',
            marginLeft: 10,
            borderWidth: border ? 1 : 0,
            borderColor: '#ddd',
          }}>
          <RNPickerSelect
            placeholder={{
              label: placeholder,
              value: defaultValue ? defaultValue : '',
            }}
            onValueChange={onChange}
            items={data}
            useNativeAndroidPickerStyle={false}
            style={{
              ...stylePicker,
              inputAndroid: {
                ...stylePicker.inputAndroid,
                fontSize: fontSize ? fontSize : 12,
                color: disabled ? '#ddd' : '#000',
                ...stylesText,
              },
              inputIOS: {
                ...stylePicker.inputIOS,
                fontSize: fontSize ? fontSize : 12,
                color: disabled ? '#ddd' : '#000',
                ...stylesText,
              },
            }}
            Icon={renderIcon(error, icon)}
            value={value}
            disabled={disabled}
          />
        </View>
      )}
    />
  );
};
export default SelectComponent;

const pickerSelectStyles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      width: 60,
      height: 40,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      marginTop: 10,
      marginLeft: 10,
    },
    inputAndroid: {
      fontSize: 12,
      fontFamily: theme.fonts.bold,
      color: theme.colors.black,
      alignSelf: 'center',
      padding: 2,
      textAlign: 'center',
    },
    inputAndroidContainer: {
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 5,
      alignContent: 'center',
    },
    inputIOSContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //  backgroundColor: 'white',
      width: '100%',
      // borderBottomColor: Colors.black,
      // borderBottomWidth: 1,
    },
    inputIOS: {
      //  flex: 1,
      height: 50,
      paddingHorizontal: 5,
      fontFamily: theme.fonts.bold,
      fontSize: 12,
      color: theme.colors.text,
      padding: 5,
      textAlign: 'center',
    },
  });
