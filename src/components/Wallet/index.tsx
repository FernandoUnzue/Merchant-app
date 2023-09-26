import { View, Text, StyleSheet } from 'react-native';
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
      <WalletIcon size={18} />
      <Text style={style.textWallet}>Saldo Wallet</Text>
      <Text style={style.textWalletNumber}>{`€${
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
      width: 185,
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
    textWallet: {
      marginTop: 2,
      fontSize: 12,
      color: theme.colors.textPrimary,
    },
    textWalletNumber: {
      fontSize: 13,
      fontFamily: theme.fonts.bold,
      color: theme.colors.textPrimary,
    },
  });
