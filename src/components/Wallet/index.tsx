import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react';
import WalletIcon from '@core/theme/SVGS/Merchant/WalletEMpty';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';
import { ThemeContext, useThemedStyles } from '@core/theme';

type Props = {};

const Wallet: React.FC<Props> = () => {
  const customer = useSelector((state: RootState) => state.customer);
  const style = useThemedStyles(styles);
  return (
    <View style={style.walletCont}>
      <WalletIcon size={15} />
      <Text
        style={{ ...style.textWallet }}
        numberOfLines={1}
        ellipsizeMode="tail">
        Saldo Wallet
      </Text>
      <Text
        style={{ ...style.textWalletNumber }}
        numberOfLines={1}
        ellipsizeMode="tail">{`€${
        customer.amount !== null
          ? customer.amount?.toFixed(2).replace('.', ',')
          : '-----'
      }`}</Text>
    </View>
  );
};

export default Wallet;
const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    walletCont: {
      borderWidth: 1,
      borderColor: theme.colors.textPrimary,
      width: 200,
      borderRadius: 30,
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
    textWallet: {
      // marginTop: Platform.OS === 'android' ? 2 : 0,
      fontSize: 12,
      color: theme.colors.textPrimary,
    },
    textWalletNumber: {
      fontSize: 12,
      fontFamily: theme.fonts.instBold,
      color: theme.colors.textPrimary,
    },
  });
