import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { FontsNew, ThemeContext, useThemedStyles } from '@core/theme';
import { UltimoMovParamList } from '@modules/logged';
import { useNavigation } from '@react-navigation/native';
import Wallet from '@components/Wallet';
import { Spacer } from '@components/Spacer';
import BackgroundImageContainer from '@components/BackgroundImage';
import CheckIcon from '@core/theme/SVGS/Merchant/CheckIcon';
import { Button } from '@components/Button';

/**
 * Types
 */

type HomeScreenDeleteUltimoMovProps = StackScreenProps<
  UltimoMovParamList,
  'DeleteScreen'
>;

const DeleteLastMovementHome: React.FC<HomeScreenDeleteUltimoMovProps> = ({
  navigation,
  route,
}) => {
  const style = useThemedStyles(styles);
  const { width } = useWindowDimensions();

  const nav = useNavigation();
  return (
    <ScrollView style={style.main}>
      <Wallet />
      <Spacer height={20} />
      <BackgroundImageContainer height={470}>
        {/* negozio row */}
        <View style={style.column}>
          <View style={{ width: '70%' }}>
            <Text style={{ fontSize: 10 }}>Negozio</Text>

            <Text style={style.fontBold}>Happy Talent</Text>
            <Spacer height={15} />
            <Text>
              Nr card <Text style={style.fontBold}>4</Text>
            </Text>
            <Spacer height={10} />
            <Text>
              ID Movimiento <Text style={style.fontBold}>123456789</Text>
            </Text>
            <Spacer height={10} />
            <Text>
              Barcode card
              <Text style={style.fontBold}>1234567891011</Text>
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
            <Text style={style.fontBold}>Mario Rossi</Text>
          </View>
          <View>
            <Text>Data</Text>
            <Text style={style.fontBold}>29/09/2023 - 22:30hs</Text>
          </View>
        </View>
        <Spacer height={10} />
        <View style={{ ...style.dashedLine, width: width - 20 }} />
        {/* importo row */}
        <View style={{ ...style.columnInter, paddingTop: 20 }}>
          <Text>Importo acquisto</Text>
          <Text style={style.fontBold}>€50,00</Text>
        </View>
        <View style={style.column}>
          <Text>Sconto coupon</Text>
          <Text style={style.fontBold}>-</Text>
        </View>
        <View style={style.columnInter}>
          <Text style={{ fontSize: 30 }}>Totale</Text>
          <Text style={{ fontFamily: FontsNew.instBold, fontSize: 30 }}>
            €50,00
          </Text>
        </View>
        <Spacer height={10} />
        <View style={{ ...style.dashedLine, width: width - 20 }} />
        <View style={{ padding: 20 }}>
          <Text>Cashback caricato</Text>
          <Text style={style.fontBold}>€2,00</Text>
        </View>
      </BackgroundImageContainer>

      <Spacer height={20} />
      <Button
        type="primary"
        title="elimina movemento"
        accessibilityLabel="elimina movemento"
        onPress={() => nav.navigate('Spesa' as never)}
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
