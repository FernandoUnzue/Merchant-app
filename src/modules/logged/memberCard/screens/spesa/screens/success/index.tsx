import {
  BackHandler,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SpesaStackParamList } from '@modules/logged';
import {
  FontsNew,
  generalColorsNew,
  ThemeContext,
  useThemedStyles,
} from '@core/theme';
import Wallet from '@components/Wallet';
import { Spacer } from '@components/Spacer';
import BackgroundImageContainer from '@components/BackgroundImage';
import { Button } from '@components/Button';
import { useWindowDimensions } from 'react-native';
import CheckIcon from '@core/theme/SVGS/Merchant/CheckIcon';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';

/**
 * Types
 */

type SuccessScreenProps = StackScreenProps<
  SpesaStackParamList,
  'SuccessSaleScreen'
>;
const SuccessSaleScreen: React.FC<SuccessScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    customerId,
    card,
    campaignId,
    campaignName,
    movementId,
    chargedPoints,
    shopName,
    discount,
    dataTime,
    localTime,
    amount,
    spesa,
    discountAmount,
  } = route.params;
  const movement = {
    customerId,
    card,
    campaignId,
    campaignName,
    movementId,
    chargedPoints,
    shopName,
    dataTime,
    localTime,
    discount,
    amount,
    discountAmount,
    spesa,
  };

  const style = useThemedStyles(styles);

  const { width } = useWindowDimensions();
  const customer = useSelector((state: RootState) => state.customer);

  useEffect(() => {
    const backAction = () => {
      //  openModal();
      // Alert.alert('back');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  return (
    <ScrollView style={style.main}>
      <Wallet />
      <Spacer height={20} />
      <BackgroundImageContainer height={470}>
        {/* negozio row */}
        <View style={style.column}>
          <View style={{ width: '70%' }}>
            <Text style={{ fontSize: 10 }}>Negozio</Text>

            <Text style={style.fontBold}>{movement.shopName}</Text>
            <Spacer height={15} />
            <Text>
              Nr card <Text style={style.fontBold}>{movement.card}</Text>
            </Text>
            <Spacer height={10} />
            <Text>
              ID Movimiento{' '}
              <Text style={style.fontBold}>{movement.movementId}</Text>
            </Text>
            <Spacer height={10} />
            <Text>
              Barcode card
              <Text style={style.fontBold}> {movement.movementId}</Text>
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
            <Text style={style.fontBold}>{localTime}</Text>
          </View>
        </View>
        <Spacer height={10} />
        <View style={{ ...style.dashedLine, width: width - 20 }} />
        {/* importo row */}
        <View style={{ ...style.columnInter, paddingTop: 20 }}>
          <Text>Importo acquisto</Text>
          <Text style={style.fontBold}>€{movement.amount.toFixed(2)}</Text>
        </View>
        <View style={style.column}>
          <Text>Sconto coupon</Text>
          <Text style={style.fontBold}>
            €{movement.discountAmount.toFixed(2)}
          </Text>
        </View>
        <View style={style.columnInter}>
          <Text style={{ fontSize: 30 }}>Totale</Text>
          <Text style={{ fontFamily: FontsNew.instBold, fontSize: 30 }}>
            €{movement.spesa.toFixed(2)}
          </Text>
        </View>
        <Spacer height={10} />
        <View style={{ ...style.dashedLine, width: width - 20 }} />
        <View style={{ padding: 20 }}>
          <Text>Cashback caricato</Text>
          <Text style={style.fontBold}>
            €{movement.chargedPoints.toFixed(2)}
          </Text>
        </View>
      </BackgroundImageContainer>

      <Spacer height={20} />
      <Button
        type="primary"
        title="TORNA ALLA HOME"
        accessibilityLabel="torna alla home"
        onPress={() => navigation.navigate('HomeSpesa')}
      />
      <Spacer height={20} />
    </ScrollView>
  );
};

export default SuccessSaleScreen;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      maxHeight: 1500,
      backgroundColor: theme.colors.background,
      padding: 10,
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
      borderColor: generalColorsNew.darkPurple,
      height: 0.25,
      borderRadius: 1,
    },
  });
