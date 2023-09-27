import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SpesaStackParamList } from '@modules/logged';
import {
  Fonts,
  generalColorsNew,
  ThemeContext,
  useThemedStyles,
} from '@core/theme';
import BackNav from '@components/BackNav';
import WalletIcon from '@core/theme/SVGS/Merchant/WalletEMpty';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';
import { useWindowDimensions } from 'react-native';
import { Separator } from '@components/Separator';
import UserBar from '@components/UserBar';
import Wallet from '@components/Wallet';
import { Button } from '@components/Button';
import { Spacer } from '@components/Spacer';

/**
 * Types
 */

type ResumeScreenProps = StackScreenProps<
  SpesaStackParamList,
  'ResumeSaleScreen'
>;
const ResumeSaleScreen: React.FC<ResumeScreenProps> = ({
  navigation,
  route,
}) => {
  const { amount } = route.params;
  const customer = useSelector((state: RootState) => state.customer);
  const { width } = useWindowDimensions();

  const style = useThemedStyles(styles);
  return (
    <View style={style.main}>
      <Wallet />
      <Separator height={30} />
      <Image
        source={require('../../../../../../../../assets/images/borderBlueTop.png')}
        style={{
          width: width - 20,
          height: 20,
        }}
      />
      <View
        style={{
          width: width - 20,
          height: 300,
          borderRadius: 1,
          backgroundColor: '#DDEAF9',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}>
          <View
            style={{
              padding: 10,
              paddingLeft: 40,
              width: (width - 20) / 2,
            }}>
            <Text style={{ fontSize: 16 }}>Riepilogo </Text>
            <Text style={{ fontSize: 16 }}>pagamento</Text>
          </View>
          <View
            style={{
              padding: 10,
              alignItems: 'center',
              width: (width - 20) / 2,
            }}>
            <Text>Totale da pagare</Text>
            <Text style={{ fontSize: 40, fontFamily: Fonts.bold }}>{`€${amount
              .toFixed(2)
              .replace('.', ',')}`}</Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderStyle: 'dashed',
            borderColor: generalColorsNew.darkPurple,
            width: width - 20,
            height: 0.25,
            borderRadius: 1,
          }}
        />
      </View>
      <Image
        source={require('../../../../../../../../assets/images/borderBlueDown.png')}
        style={{
          width: width - 20,
          height: 20,
        }}
      />
      <Spacer height={20} />
      <UserBar />
      <Spacer height={20} />
      <Button
        type="primary"
        title="pagamento"
        accessibilityLabel="pagamento"
        onPress={() => navigation.navigate('PaymentSaleScreen', { amount })}
      />
    </View>
  );
};

export default ResumeSaleScreen;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: 10,
    },
    title: {
      fontSize: 18,
    },
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
