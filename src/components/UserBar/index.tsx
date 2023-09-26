import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';
import UserIcon from '@core/theme/SVGS/Merchant/UserIcon';
import { Spacer } from '@components/Spacer';

type Props = {};

const UserBar: React.FC<Props> = () => {
  const customer = useSelector((state: RootState) => state.customer);
  const style = useThemedStyles(styles);
  return (
    <View style={style.squareContent}>
      <UserIcon size={50} />
      <View style={style.square}>
        <Spacer height={35} />
        <Text style={style.text}>Cardholder name</Text>
        <Text
          style={{ ...style.textBold, width: 100 }}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {customer.userInfo?.first_name} {customer.userInfo?.last_name}
        </Text>
      </View>
      <View style={style.square}>
        <Spacer height={35} />
        <Text style={style.text}>Numero card</Text>
        <Text style={style.textBold}>{customer.card}</Text>
      </View>
    </View>
  );
};

export default UserBar;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    squareContent: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      borderRadius: 50,
      width: '100%',
    },
    text: {
      fontSize: 10,
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    textBold: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    square: {
      //    borderWidth: 1,
      borderColor: '#ddd',
      //   backgroundColor: '#fff',
      padding: 10,
      width: 120,
      height: 110,
      borderRadius: 10,
      textAlign: 'center',
    },
  });
