import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, { ReactNode, useCallback, useState } from 'react';
import { ThemeContext, useThemedStyles } from '@core/theme';
import RNPickerSelect from 'react-native-picker-select';
import ArrowDown from '@core/theme/SVGS/ArrowDown';
import ArrowUp from '@core/theme/SVGS/ArrowUp';
import { Controller } from 'react-hook-form';
import WarningIcon from '@core/theme/SVGS/WarningIcon';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import SearchIcon from '@core/theme/SVGS/Vetrina/SearchIcon';
import { FlatList } from 'react-native-gesture-handler';
import { reduceArray } from '@core/helpers/utils';

type Props = {
  control: any;
  name: string;
  rules?: Object;
  data: Array<{ label: string; value: any }>;
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
};

const SelectFilterComponent: React.FC<Props> = ({
  control,
  name,
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
  disabled = false,
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

  const [keySearch, setKeySearch] = useState<string>();

  const handleChange = (text: string) => {
    if (text && text !== '') {
      setKeySearch(text?.toLowerCase());
      searchFunc(data, text);
    } else {
      setKeySearch('');
      setLableSelected(false);
    }
  };

  const [dataResult, setDataResult] = useState<any[]>();

  const searchFunc = (
    dataArray: Array<{ label: string; value: any }>,
    text: string | undefined,
  ) => {
    if (text) {
      const respIncludes = dataArray.filter(
        res =>
          res.label.trim().toLowerCase().includes(text.toLowerCase()) === true,
      );
      const respStartWith = dataArray.filter(
        res =>
          res.label.trim().toLowerCase().startsWith(text.toLowerCase()) ===
          true,
      );

      const finalArrayResult = respStartWith.concat(respIncludes);
      console.log(finalArrayResult);
      console.log(reduceArray(finalArrayResult));
      setDataResult(reduceArray(finalArrayResult));
    }
  };

  const selectValue = ({
    onChange,
    item,
  }: {
    onChange: (a: any) => void;
    item: any;
  }) => {
    onChange(item.value);
    setLableSelected(true);
    setKeySearch(item.label);
  };

  const [labelSelected, setLableSelected] = useState<boolean>(false);
  // console.log(`keyseaarch: ${keySearch}`);
  // console.log(`data result : ${dataResult}`);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => {
        return (
          <View
            style={{
              ...styles,
              width: widthField ? widthField : 200,
              height: 50,
              backgroundColor: backColor ? backColor : '#fff',
              marginLeft: 10,
              borderWidth: border ? 1 : 0,
              borderColor: '#ddd',
              position: 'relative',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <SearchIcon size={15} styles={{ marginTop: 20 }} />
              <TextInput
                value={keySearch ? keySearch : ''}
                defaultValue={value}
                onChangeText={handleChange}
                placeholder={placeholder}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // textAlign: 'center',
                  fontSize: 15,
                  marginLeft: 10,
                  height: 50,
                  color: disabled ? '#ddd' : '#000',
                }}
                editable={!disabled}
              />
              {error && (
                <WarningIcon
                  size={20}
                  styles={{ marginRight: 5, marginTop: 13 }}
                />
              )}
              {icon && icon}
            </View>

            {keySearch && keySearch !== '' && !labelSelected ? (
              <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={dataResult ? dataResult : data}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => selectValue({ onChange, item })}
                    hitSlop={20}>
                    <View
                      style={{
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#F5F5F5',
                      }}>
                      {item && (
                        <Text style={{ fontSize: 14, textAlign: 'center' }}>
                          {item.label}
                        </Text>
                      )}
                    </View>
                  </Pressable>
                )}
                keyExtractor={(item, i) => `${item.value.toString()}_${i}`}
                nestedScrollEnabled={true}
                //  showsVerticalScrollIndicator={FA}
                scrollEnabled={true}
                style={{
                  position: 'absolute',
                  width: widthField,
                  top: '100%',
                  borderWidth: 1,
                  borderColor: '#ddd',
                  maxHeight: 135,
                  // minHeight: 50,
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  // zIndex: 99,
                }}
              />
            ) : null}
          </View>
        );
      }}
    />
  );
};

export default SelectFilterComponent;

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
      paddingLeft: 20,
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
