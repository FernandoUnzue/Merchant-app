import { StyleSheet, View } from 'react-native';
import { Control, Controller, Path } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';

import { Colors, Fonts } from '@core/theme';
import { ReactNode } from 'react';
import ArrowDown from '@core/theme/SVGS/ArrowDown';

/**
 * Types
 */

interface ISelectInput<ContentType> {
  control: Control<ContentType, object>;
  name: Path<ContentType>;
  rules?: {};
  placeholder: string;
  data: any[];
  icon?: ReactNode;
  styles?: any;
  backColor?: string;
}

/**
 * SelectInput
 */

export function SelectInput<ContentType>({
  control,
  name,
  rules = {},
  placeholder,
  data,
  icon,
  styles,
  backColor = '#fff',
}: ISelectInput<ContentType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <RNPickerSelect
          placeholder={{
            label: placeholder,
            value: '',
          }}
          onValueChange={onChange}
          items={data}
          useNativeAndroidPickerStyle={false}
          style={{ ...pickerSelectStyles, ...styles }}
          Icon={icon ? () => icon : () => null}
          value={value}
        />
      )}
    />
  );
}

/**
 * Styles
 */

const pickerSelectStyles = StyleSheet.create({
  inputIOSContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //  backgroundColor: 'white',
    width: '100%',
    borderBottomColor: Colors.text,
    borderBottomWidth: 1,
  },
  inputIOS: {
    flex: 1,
    height: 30,
    paddingHorizontal: 5,
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Colors.text,
  },
  inputAndroidContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //  backgroundColor: 'white',
    width: '100%',
    borderBottomColor: Colors.text,
    borderBottomWidth: 1,
  },
  inputAndroid: {
    flex: 1,
    height: 36,
    paddingBottom: 3,
    paddingHorizontal: 5,
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Colors.text,
  },
  placeholder: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Colors.text,
  },
});
