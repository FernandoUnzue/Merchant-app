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
import BackgroundImageContainer from '@components/BackgroundImage';

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
      <BackgroundImageContainer>
        <View style={style.column}>
          <View style={{ width: '50%' }}>
            <Text style={{ ...style.textGrey, fontSize: 16 }}>Riepilogo </Text>
            <Text style={{ ...style.textGrey, fontSize: 16 }}>pagamento</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              width: '50%',
            }}>
            <Text>Totale da pagare</Text>
            <Text style={{ ...style.textBold, fontSize: 40 }}>{`€${amount
              .toFixed(2)
              .replace('.', ',')}`}</Text>
          </View>
        </View>
        <View style={{ ...style.dashedLine, width: width - 20 }} />
        <View style={style.column}>
          <View>
            <Text style={style.textGrey}>Importo spesa</Text>
            <Text style={{ ...style.textBold, fontSize: 30 }}>{`€ ${amount
              .toFixed(2)
              .replace('.', ',')}`}</Text>
          </View>
          <View>
            <Text style={style.textGrey}>Importo coupon utilizzati</Text>
            <Text
              style={{
                ...style.textBold,
                fontSize: 30,
                textAlign: 'right',
              }}>{`€ 0,00`}</Text>
          </View>
        </View>
      </BackgroundImageContainer>

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
    textBold: {
      fontFamily: theme.fonts.instBold,
    },
    column: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
    },
    title: {
      fontSize: 18,
    },
    textGrey: {
      color: theme.colors.textGrey,
      fontFamily: theme.fonts.instBold,
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
    dashedLine: {
      borderWidth: 0.5,
      borderStyle: 'dashed',
      borderColor: generalColorsNew.darkPurple,
      height: 0.25,
      borderRadius: 1,
    },
    textWalletNumber: {
      fontSize: 13,
      fontFamily: theme.fonts.bold,
      color: theme.colors.textPrimary,
    },
  });
