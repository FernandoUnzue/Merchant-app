import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SpesaStackParamList } from '@modules/logged';
import { ThemeContext, useThemedStyles } from '@core/theme';

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
  const { amount } = route.params;

  const style = useThemedStyles(styles);
  return (
    <View style={style.main}>
      <Text style={style.title}>SucessSaleScreen</Text>
    </View>
  );
};

export default SuccessSaleScreen;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      flex: 1,
    },
    title: {
      fontSize: 18,
    },
  });
