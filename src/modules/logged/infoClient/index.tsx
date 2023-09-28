import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { InfoClientParamList } from '..';
import {
  FontsNew,
  generalColorsNew,
  ThemeContext,
  useThemedStyles,
} from '@core/theme';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';
import { Spacer } from '@components/Spacer';
import UserIcon from '@core/theme/SVGS/Merchant/UserIcon';

/**
 * Types
 */

type HomeScreenInfoClientProps = StackScreenProps<
  InfoClientParamList,
  'HomeScreen'
>;

const InfoClientHomeScreen: React.FC<HomeScreenInfoClientProps> = ({
  navigation,
  route,
}) => {
  const style = useThemedStyles(styles);
  const customer = useSelector((state: RootState) => state.customer);
  return (
    <View style={style.main}>
      <Text style={style.title}>Info Cliente</Text>
      <Spacer height={10} />
      {customer.userInfo?.avatar_photo ? (
        <Image
          source={{ uri: customer.userInfo?.avatar_photo }}
          style={style.avatar}
        />
      ) : (
        <UserIcon size={120} />
      )}
      <Spacer height={10} />
      <View style={style.contMain}>
        <Text style={style.text}>Nome e cognome</Text>
        <View style={style.constSubr}>
          <Text style={style.textValue}>
            {customer.userInfo?.first_name} {customer.userInfo?.last_name}
          </Text>
        </View>
        <Spacer height={10} />
        <Text style={style.text}>Numero de card</Text>
        <View style={style.constSubr}>
          <Text style={style.textValue}>{customer.card}</Text>
        </View>
      </View>
      <Spacer height={10} />
      <Text
        style={{
          ...style.text,
          color: generalColorsNew.accent,
          fontFamily: FontsNew.instBold,
        }}>
        Stato
      </Text>
      <View style={style.statoCont}>
        <Text style={style.statoText}>ATTIVO</Text>
      </View>
    </View>
  );
};

export default InfoClientHomeScreen;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    contMain: {
      paddingHorizontal: '20%',
    },
    title: {
      fontSize: 20,
      fontFamily: theme.fonts.instBold,
      textAlign: 'center',
    },
    text: {
      fontSize: 12,
      color: theme.colors.textGrey,
      textAlign: 'center',
      paddingBottom: 5,
    },
    textValue: {
      fontSize: 16,
      textAlign: 'center',
      paddingBottom: 10,
    },
    constSubr: {
      borderBottomWidth: 1,
      alignItems: 'center',
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 100,
      alignSelf: 'center',
      paddingVertical: 10,
    },
    statoCont: {
      backgroundColor: theme.colors.success,
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignSelf: 'center',
    },
    statoText: {
      color: '#fff',
      fontSize: 20,
      fontFamily: theme.fonts.instBold,
    },
  });
