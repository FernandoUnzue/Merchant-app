import { StyleHTMLAttributes, useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput as TextInputNative,
  StyleSheet,
  TextInputProps,
  Pressable,
  Keyboard,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  ListRenderItem,
  Platform,
} from 'react-native';
import { Control, Controller, Path } from 'react-hook-form';
import Clipboard from '@react-native-community/clipboard';

import { Fonts, ThemeContext, useThemedStyles } from '@core/theme';
import { Icon } from '@components/Icon';
import { ShowIf } from '@components/ShowIf';
import { SearchIcon } from '@core/theme/SVGS/Vetrina/SearchIcon';
import ContextMenu from 'react-native-context-menu-view';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SearchGiftCard, SearchShop } from '@core/interfaces';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

/**
 * Types
 */

interface IFormInput<ContentType> extends TextInputProps {
  control: Control<ContentType, object>;
  name: Path<ContentType>;
  rules?: object;
  disablePaste?: boolean;
  grayish?: boolean;
  okMessage?: string;
  errorMessage?: string;
  widthField?: number | string;
  data?: Array<SearchShop>;
  styless?: any;
  backColor?: string;
  setValue: (a: string, b: any) => void;
  namePageTab?: string;
  namePageStack?: string;
  giftCard?: boolean;
}

/**
 * TextInput
 */

export const SearchInput: React.FC<IFormInput<ContentType>> = ({
  control,
  name,
  rules = {},
  disablePaste = false,
  grayish = false,
  okMessage,
  errorMessage,
  widthField,
  data,
  styless,
  backColor,
  namePageTab,
  namePageStack,
  setValue,
  giftCard = false,
  ...props
}: IFormInput<ContentType>) => {
  const style = useThemedStyles(styles);

  const resetClipboard = useCallback(() => Clipboard.setString(''), []);

  const navigation = useNavigation();

  const renderItem = ({ item }: { item: SearchShop }) => {
    return (
      <Pressable
        onPress={() => {
          setValue(name, item.name);
          navigation.navigate(
            (namePageStack && namePageTab ? namePageTab : 'Shop') as never,
            {
              screen:
                namePageStack && namePageTab ? namePageStack : 'NegozioScreen',
              params: { id: item.shopId },
            } as never,
          );
          setValue(name, '');
        }}
        hitSlop={5}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 1,
            backgroundColor: '#fff',
            width: '100%',
          }}>
          <Image
            source={{ uri: item.logoUrl }}
            style={{
              width: 60,
              height: 30,
              resizeMode: 'contain',
              aspectRatio: 2,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              width: '75%',
            }}>
            <View style={{ alignContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  ...style.colorBlack,
                  fontSize: 9,
                  alignSelf: 'center',
                  textTransform: 'uppercase',
                  fontFamily: Fonts.bold,
                  width: 75,
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name}{' '}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 9, textAlign: 'center' }}>Cashback</Text>
              <Text style={style.numberGreen2}>
                {Number(item.cashbackValue).toFixed(2)}
                {item.currencySymbol}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderItemGiftCard = ({ item }: { item: SearchGiftCard }) => {
    return (
      <Pressable
        onPress={() => {
          setValue(name, item.name);
          navigation.navigate(
            (namePageStack && namePageTab ? namePageTab : 'Shop') as never,
            {
              screen:
                namePageStack && namePageTab ? namePageStack : 'NegozioScreen',
              params: { id: item.shopId },
            } as never,
          );
          setValue(name, '');
        }}
        hitSlop={10}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 1,
            backgroundColor: '#fff',
            width: '100%',
          }}>
          <Image
            source={{ uri: item.logoUrl }}
            style={{
              width: 60,
              height: 30,
              resizeMode: 'contain',
              aspectRatio: 2,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              width: '75%',
            }}>
            <View style={{ alignContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  ...style.colorBlack,
                  fontSize: 9,
                  alignSelf: 'center',
                  textTransform: 'uppercase',
                  fontFamily: Fonts.bold,
                  width: 75,
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name}{' '}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 9, textAlign: 'center' }}>
                GIFT CARD
              </Text>
              <Text style={style.numberGreen2}>{item.displayAmount}€</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
          formState: { isDirty },
        }) => (
          <>
            <View
              style={{
                ...styless,
                width: widthField ? widthField : '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: backColor ? backColor : '#fff',
                height: 50,
                borderColor: '#ddd',
                borderWidth: 1,
                position: 'relative',
              }}>
              <View style={style.iconLeft}>
                <SearchIcon size={18} />
              </View>

              <TextInputNative
                value={value as string}
                onChangeText={onChange}
                onBlur={onBlur}
                onFocus={() => disablePaste && resetClipboard()}
                onSelectionChange={() => disablePaste && resetClipboard()}
                onSubmitEditing={Keyboard.dismiss}
                style={[style.input, style.editableInput]}
                {...props}
              />
            </View>
            {data && data.length > 0 && value !== '' && (
              <>
                {Platform.OS !== 'ios' ? (
                  <FlatList
                    style={{
                      position: 'absolute',
                      width: widthField,
                      top: '100%',
                      borderWidth: 1,
                      borderColor: '#ddd',
                      maxHeight: 200,
                      borderRadius: 5,
                    }}
                    contentContainerStyle={{ flex: 1 }}
                    data={data}
                    scrollEnabled={true}
                    renderItem={giftCard ? renderItemGiftCard : renderItem}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    keyExtractor={item => item.shopId.toString()}
                    keyboardShouldPersistTaps={'always'}
                  />
                ) : (
                  <KeyboardAwareFlatList
                    style={{
                      position: 'absolute',
                      width: widthField,
                      top: '100%',
                      borderWidth: 1,
                      borderColor: '#ddd',
                      maxHeight: 200,
                      borderRadius: 5,
                    }}
                    contentContainerStyle={{ flex: 1 }}
                    data={data}
                    scrollEnabled={true}
                    renderItem={giftCard ? renderItemGiftCard : renderItem}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    keyExtractor={item => item.shopId.toString()}
                    keyboardShouldPersistTaps={'always'}
                  />
                )}
              </>
            )}

            <View style={style.errorWrapper}>
              <ShowIf condition={!!error || !!errorMessage}>
                <Text style={style.errorMessage}>
                  {error?.message || errorMessage || 'Error'}
                </Text>
              </ShowIf>
            </View>
          </>
        )}
      />
      {/*  <ScrollView style={{
        maxHeight: 400,
        width: "100%",
        zIndex: 99, 
        position:"absolute", 
        top: "100%", 
    }}>
   <View style={{
        elevation:1, 
        width: widthField, 
        borderRadius: 5,
        borderWidth: 1,
        }}>
        {data && data.map((a)=>{
            return(
                <View style={{flexDirection: "row",zIndex: 99, justifyContent:"space-between",padding: 10, backgroundColor: "#fff", zIndex: 99, width: "100%"}}>
                    <Image source={require("../../../assets/images/mia-logo.png")} style={{width: 60, height: 30}} />
                    <View style={{flexDirection: "row", justifyContent: "space-between", padding: 5, width: "65%"}}>
                        <Text style={style.colorBlack}>{a.negozioName} </Text>
                        <Text style={style.numberGreen2}>{a.percent}%</Text>   
                    </View>
                
                                
                </View>
            )
        })}
    </View>
 
        
  </ScrollView>*/}
    </>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.white,
      heigh: 50,
      width: '100%',
      borderRadius: 2,
      borderColor: theme.colors.inputBorder,
      borderWidth: 1,
    },
    input: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // textAlign: 'center',
      fontSize: 15,
      marginLeft: 10,
      height: 50,
    },
    numberGreen2: {
      color: theme.colors.accent,
      fontFamily: theme.fonts.bold,
      fontSize: 14,
    },
    colorBlack: {
      color: theme.colors.black,
    },
    editableInput: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.textQuintiary,
    },
    fixedInput: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.textDisabledSecondary,
    },
    iconLeft: {
      marginLeft: 18,
      alignSelf: 'center',
    },
    iconRight: {
      marginRight: 16,
      alignSelf: 'center',
    },
    iconSuccess: {
      color: theme.colors.success,
    },
    iconWarning: {
      color: theme.colors.warning,
    },
    fieldName: {
      position: 'absolute',
      right: 16,
      bottom: 2,
      fontFamily: theme.fonts.regular,
      fontSize: 10,
      color: theme.colors.textSextiary,
    },
    errorWrapper: {
      height: 20,
      justifyContent: 'center',
    },
    message: {
      fontSize: 10,
      color: theme.colors.warning,
      textAlign: 'center',
    },
    errorMessage: {
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      color: theme.colors.warning,
      textAlign: 'center',
    },
    errorLink: {
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      color: theme.colors.accent,
      alignSelf: 'stretch',
    },
  });
