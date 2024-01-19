import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { FontsNew, ThemeContext, useThemedStyles } from '@core/theme';
import { DeleteUltimoMovParamList, UltimoMovParamList } from '@modules/logged';
import { useNavigation } from '@react-navigation/native';
import Wallet from '@components/Wallet';
import { Spacer } from '@components/Spacer';
import BackgroundImageContainer from '@components/BackgroundImage';
import CheckIcon from '@core/theme/SVGS/Merchant/CheckIcon';
import { Button } from '@components/Button';
import {
  useGetLastMovementQuery,
  useReloadSalesMutation,
} from '@core/redux/Api/endpoints/Webpos';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';
import { formatNumber } from '@core/helpers';

/**
 * Types
 */

type HomeScreenDeleteUltimoMovProps = StackScreenProps<
  DeleteUltimoMovParamList,
  'DeleteScreen'
>;

const DeleteLastMovementHome: React.FC<HomeScreenDeleteUltimoMovProps> = ({
  navigation,
  route,
}) => {
  const style = useThemedStyles(styles);
  const { width } = useWindowDimensions();

  const nav = useNavigation();
  const [reloadSales] = useReloadSalesMutation();

  const customer = useSelector((state: RootState) => state.customer);

  const { data, isLoading } = useGetLastMovementQuery({
    customerId: customer.userInfo
      ? customer.userInfo.fnet_customer_id.toString()
      : '0',
  });

  useEffect(() => {
    reloadSales();
  }, []);
  return (
    <ScrollView style={style.main}>
      <Text style={style.mainTitle}>Elimina movimento</Text>
      <Spacer height={20} />
      <BackgroundImageContainer height={470}>
        {/* negozio row */}
        {isLoading ? (
          <View style={{ paddingVertical: 150 }}>
            <ActivityIndicator size={'large'} color={'#173E46'} />
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
                <Text style={{ textAlign: 'right' }}>Data</Text>
                <Text style={style.fontBold}>{data?.movement.localTime}</Text>
              </View>
            </View>
            <Spacer height={10} />
            <View style={{ ...style.dashedLine, width: width - 20 }} />
            {/* importo row */}
            <View style={{ ...style.columnInter, paddingTop: 20 }}>
              <Text>Importo acquisto</Text>
              <Text style={style.fontBold}>
                €{formatNumber(Number(data?.movement.totalMoney), 2)}
              </Text>
            </View>
            <View style={style.column}>
              <Text>Sconto coupon</Text>
              <Text style={style.fontBold}>
                €{formatNumber(Number(data?.movement.discount), 2)}
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
                €{formatNumber(Number(data?.movement.totalMoney), 2)}
              </Text>
            </View>
            <Spacer height={10} />
            <View style={{ ...style.dashedLine, width: width - 20 }} />
            <View style={{ padding: 20 }}>
              <Text>Cashback caricato</Text>
              <Text style={style.fontBold}>
                €{formatNumber(Number(data?.movement.chargedPoints), 2)}
              </Text>
            </View>
          </>
        )}
      </BackgroundImageContainer>

      <Spacer height={20} />
      <Button
        type="primary"
        title="Elimina movimento"
        accessibilityLabel="elimina movimento"
        stylesTitle={{
          fontSize: 16,
        }}
        onPress={() => navigation.navigate('DeleteConfirmScreen')}
      />
      <Spacer height={20} />
    </ScrollView>
  );
};

export default DeleteLastMovementHome;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      maxHeight: 1500,
      backgroundColor: theme.colors.background,
      padding: 10,
    },
    mainTitle: {
      fontSize: 18,
      fontFamily: theme.fonts.instBold,
      textAlign: 'center',
    },
    fontBold: {
      fontFamily: theme.fonts.instBold,
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
