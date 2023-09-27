import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SpesaStackParamList } from '@modules/logged';
import { generalColorsNew, ThemeContext, useThemedStyles } from '@core/theme';
import Wallet from '@components/Wallet';
import { Spacer } from '@components/Spacer';
import UserBar from '@components/UserBar';
import { Button } from '@components/Button';

/**
 * Types
 */

type PaymentScreenProps = StackScreenProps<
  SpesaStackParamList,
  'PaymentSaleScreen'
>;
const PaymentSaleScreen: React.FC<PaymentScreenProps> = ({
  navigation,
  route,
}) => {
  const { amount } = route.params;

  const style = useThemedStyles(styles);
  return (
    <View style={style.main}>
      <Wallet />
      <Spacer height={20} />
      <View style={style.squareCoupon}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={style.text} numberOfLines={1} ellipsizeMode={'tail'}>
            Totale a pagare
          </Text>
          <Text style={style.number}>{`${amount
            .toFixed(2)
            .replace('.', ',')}€`}</Text>
        </View>
      </View>
      <Spacer height={20} />
      <View style={style.square}>
        <Spacer height={50} />
        <ActivityIndicator size={'large'} color={generalColorsNew.accent} />
      </View>
      <Spacer height={20} />
      <UserBar />
      <Spacer height={10} />
      <Button
        type="primary"
        title="conferma pagamento"
        accessibilityLabel="conferma pagamento"
        onPress={() => navigation.navigate('SuccessSaleScreen', { amount })}
      />
    </View>
  );
};

export default PaymentSaleScreen;

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
    number: {
      fontSize: 25,
      fontFamily: theme.fonts.bold,
    },
    text: {
      fontSize: 12,
      fontFamily: theme.fonts.bold,
      width: 200,
      marginTop: 6,
    },
    square: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 20,
      borderRadius: 20,
      width: '100%',
      minHeight: 250,
    },
    squareCoupon: {
      backgroundColor: theme.colors.greenLight,
      borderWidth: 1,
      borderColor: theme.colors.greenDark,
      padding: 15,
      borderRadius: 20,
      width: '100%',
    },
  });
