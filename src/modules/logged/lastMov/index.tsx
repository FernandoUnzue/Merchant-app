import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { UltimoMovParamList } from '..';
import { FontsNew, ThemeContext, useThemedStyles } from '@core/theme';
import Wallet from '@components/Wallet';
import { Spacer } from '@components/Spacer';
import BackgroundImageContainer from '@components/BackgroundImage';
import CheckIcon from '@core/theme/SVGS/Merchant/CheckIcon';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { useGetLastMovementQuery } from '@core/redux/Api/endpoints/Webpos';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { ActivityIndicator } from 'react-native';

/**
 * Types
 */

type HomeScreenUltimoMovProps = StackScreenProps<
  UltimoMovParamList,
  'HomeScreen'
>;

const LastMovementHome: React.FC<HomeScreenUltimoMovProps> = ({
  navigation,
  route,
}) => {
  const style = useThemedStyles(styles);

  const { width } = useWindowDimensions();

  const nav = useNavigation();

  const customer = useSelector((state: RootState) => state.customer);

  const { data, isLoading } = useGetLastMovementQuery({
    customerId: customer.userInfo
      ? customer.userInfo.fnet_customer_id.toString()
      : '0',
  });
  return (
    <ScrollView style={style.main}>
      <Wallet />
      <Spacer height={20} />
      <BackgroundImageContainer height={470}>
        {/* negozio row */}
        {isLoading ? (
          <View>
            <ActivityIndicator size={'large'} color={'#FF6E46'} />
          </View>
        ) : (
          <>
            <View style={style.column}>
              <View style={{ width: '70%' }}>
                <Text style={{ fontSize: 10 }}>Negozio</Text>

                <Text style={style.fontBold}>{data?.movement.shopName}</Text>
                <Spacer height={15} />
                <Text>
                  Nr card <Text style={style.fontBold}>{customer.card}</Text>
                </Text>
                <Spacer height={10} />
                <Text>
                  ID Movimiento{' '}
                  <Text style={style.fontBold}>
                    {data?.movement.movementId}
                  </Text>
                </Text>
                <Spacer height={10} />
                <Text>
                  Barcode card
                  <Text style={style.fontBold}>
                    {' '}
                    {data?.movement.movementId}
                  </Text>
                </Text>
              </View>
              <View style={{ width: '30%' }}>
                <CheckIcon size={30} styles={{ alignSelf: 'flex-end' }} />
              </View>
            </View>
            <View style={{ ...style.dashedLine, width: width - 20 }} />
            <Spacer height={10} />
            {/* cliente row */}
            <View style={style.columnInter}>
              <View>
                <Text>Cliente</Text>
                <Text style={style.fontBold}>
                  {' '}
                  {customer.userInfo?.first_name} {customer.userInfo?.last_name}
                </Text>
              </View>
              <View>
                <Text>Data</Text>
                <Text style={style.fontBold}>{data?.movement.localTime}</Text>
              </View>
            </View>
            <Spacer height={10} />
            <View style={{ ...style.dashedLine, width: width - 20 }} />
            {/* importo row */}
            <View style={{ ...style.columnInter, paddingTop: 20 }}>
              <Text>Importo acquisto</Text>
              <Text style={style.fontBold}>
                €{data?.movement.totalMoney.toFixed(2)}
              </Text>
            </View>
            <View style={style.column}>
              <Text>Sconto coupon</Text>
              <Text style={style.fontBold}>
                €{data?.movement.discount.toFixed(2)}
              </Text>
            </View>
            <View style={style.columnInter}>
              <Text style={{ fontSize: 30 }}>Totale</Text>
              <Text
                style={{
                  fontFamily: FontsNew.instBold,
                  fontWeight: 'bold',
                  fontSize: 30,
                }}>
                €{data?.movement.totalMoney.toFixed(2)}
              </Text>
            </View>
            <Spacer height={10} />
            <View style={{ ...style.dashedLine, width: width - 20 }} />
            <View style={{ padding: 20 }}>
              <Text>Cashback caricato</Text>
              <Text style={style.fontBold}>
                €{data?.movement.chargedPoints.toFixed(2)}
              </Text>
            </View>
          </>
        )}
      </BackgroundImageContainer>

      <Spacer height={20} />
      <Button
        type="primary"
        title="CHIUDI"
        accessibilityLabel="chiudi"
        onPress={() => nav.navigate('Spesa' as never)}
      />
      <Spacer height={20} />
    </ScrollView>
  );
};

export default LastMovementHome;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      maxHeight: 1500,
      backgroundColor: theme.colors.background,
      padding: 10,
    },
    fontBold: {
      fontFamily: theme.fonts.instBold,
      fontWeight: 'bold',
    },
    column: {
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    columnInter: {
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 18,
    },
    dashedLine: {
      borderWidth: 0.5,
      borderStyle: 'dashed',
      borderColor: theme.colors.darkPurple,
      height: 0.25,
      borderRadius: 1,
    },
  });
