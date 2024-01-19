import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { useGetVochersQuery } from '@core/redux/Api/endpoints/Webpos';
import DiscountIcon from '@core/theme/SVGS/DiscuontIcon';
import DollarIcon from '@core/theme/SVGS/DollarIcon';
import ButtonFlat from '@components/ButtonFlat';
import { formatNumber } from '@core/helpers';

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

  const { data, isLoading } = useGetVochersQuery({
    customerId: customer.card ? customer?.card?.toString() : '0',
  });

  type ButtonPushedProps = {
    kind: number;
    id: number;
  };

  const [pushed, setPushed] = useState<ButtonPushedProps>({
    kind: 0,
    id: 0,
  });

  type DiscuointProp = {
    sign: string;
    amount: number;
  };

  const [discuount, setDiscount] = useState<DiscuointProp>({
    sign: '€',
    amount: 0,
  });

  const couponDiscount =
    discuount.sign === '€'
      ? `${discuount.amount === 0 ? 0 : Number(discuount.amount).toFixed(2)}`
      : ((Number(amount) * discuount.amount) / 100).toFixed(2);

  const totalAmount =
    discuount.sign === '€'
      ? (Number(amount) - discuount.amount).toFixed(2)
      : (Number(amount) - Number(couponDiscount)).toFixed(2);

  return (
    <ScrollView style={{ maxHeight: 1200 }} contentContainerStyle={style.main}>
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
            <Text
              style={{
                ...style.textBold,
                fontSize: 25,
              }}>{`€${formatNumber(Number(totalAmount), 2)}`}</Text>
          </View>
        </View>
        <View style={{ ...style.dashedLine, width: width - 20 }} />
        <View style={style.column}>
          <View>
            <Text style={style.textGrey}>Importo spesa</Text>
            <Text
              style={{ ...style.textBold, fontSize: 18 }}>{`€ ${formatNumber(
              amount,
              2,
            )}`}</Text>
          </View>
          <View>
            <Text
              style={{ ...style.textGrey, maxWidth: 180 }}
              numberOfLines={1}
              ellipsizeMode="tail">
              Importo coupon utilizzati
            </Text>
            <Text
              style={{
                ...style.textBold,
                fontSize: 25,
                textAlign: 'center',
              }}>{`€${formatNumber(Number(couponDiscount), 2)}`}</Text>
          </View>
        </View>
        <View>
          {isLoading ? (
            <View style={{ paddingVertical: 50 }}>
              <ActivityIndicator
                size={'large'}
                color="#FF6E46"
                style={{ alignSelf: 'center' }}
              />
            </View>
          ) : null}
          {data?.vouchers.length === 0 ? (
            <View style={{ paddingVertical: 50 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                No Coupons available
              </Text>
            </View>
          ) : null}
          {data?.vouchers.map((c, i) => {
            return (
              <ImageBackground
                source={require('../../../../../../../../assets/images/TicketBG.png')}
                resizeMode="contain"
                style={{ marginHorizontal: 10, marginVertical: 5 }}>
                <View
                  //  className={`flex flex-row justify-between ${styles.backImage} px-2 py-4`}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                  key={`${c.kind}_${c.id}`}>
                  <View
                    // className="flex flex-row basis-1/2 justify-evenly"
                    style={{
                      justifyContent: 'space-evenly',
                      flexDirection: 'row',
                    }}>
                    {c.kind === 1 ? (
                      <DiscountIcon size={40} />
                    ) : (
                      <DollarIcon size={40} />
                    )}
                    <Text
                      //  className="text-md sm:text-xl font-bold pt-2 pl-2"
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        paddingTop: 12,
                        paddingLeft: 10,
                      }}>
                      Sconto {c.kind === 1 ? c.value * 100 : c.value.toFixed(0)}{' '}
                      {c.kind === 1 ? '%' : '€'}
                    </Text>
                  </View>
                  <View
                    // className="basis-1/2 text-center"
                    style={{ alignItems: 'center' }}>
                    {pushed.kind === c.kind && pushed.id === c.id ? (
                      <ButtonFlat
                        widthButton={130}
                        heightButton={48}
                        fontSize={12}
                        textStyles={{
                          color: '#173E46',
                        }}
                        color="#fff"
                        title="Deseleziona"
                        styless={{
                          borderRadius: 50,
                          alignSelf: 'center',
                          borderWidth: 2,
                          borderColor: '#173E46',
                        }}
                        onPress={() => {
                          setPushed({
                            kind: c.kind,
                            id: 0,
                          });
                          setDiscount({
                            sign: c.kind === 1 ? '%' : '€',
                            amount: 0,
                          });
                        }}
                      />
                    ) : (
                      <ButtonFlat
                        widthButton={120}
                        heightButton={45}
                        fontSize={10}
                        textStyles={{
                          color:
                            pushed.kind === c.kind &&
                            pushed.id !== c.id &&
                            pushed.kind !== 0 &&
                            pushed.id !== 0
                              ? '#ddd'
                              : '#fff',
                        }}
                        color="#FF6E46"
                        title="Utilizza"
                        onPress={() => {
                          setPushed({
                            kind: c.kind,
                            id: c.id,
                          });
                          setDiscount({
                            sign: c.kind === 1 ? '%' : '€',
                            amount: c.kind === 1 ? c.value * 100 : c.value,
                          });
                        }}
                        styless={{
                          borderRadius: 50,
                          alignSelf: 'center',
                        }}
                        disable={
                          (pushed.kind === c.kind &&
                            pushed.id !== c.id &&
                            pushed.kind !== 0 &&
                            pushed.id !== 0) ||
                          amount < c.value
                        }
                      />
                    )}
                  </View>
                </View>
              </ImageBackground>
            );
          })}
        </View>
      </BackgroundImageContainer>

      <Spacer height={20} />
      <UserBar />
      <Spacer height={20} />
      <Button
        type="primary"
        title="pagamento"
        accessibilityLabel="pagamento"
        onPress={() =>
          navigation.navigate('PaymentSaleScreen', {
            spesa: Number(totalAmount),
            amount,
            discount: Number(couponDiscount),
            voucherId: pushed.id,
          })
        }
      />
    </ScrollView>
  );
};

export default ResumeSaleScreen;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      // flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: 10,
    },
    textBold: {
      fontFamily: theme.fonts.instBold,
      fontWeight: 'bold',
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
      fontSize: 12,
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
