import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SpesaStackParamList } from '@modules/logged';
import { ThemeContext, useThemedStyles } from '@core/theme';

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
      <Text style={style.title}>PaymentSaleScreen</Text>
      <Text>{amount.toFixed(2)}</Text>
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
  });
