import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { LoggedStackParamList } from '@modules/logged';
import OkIcon from '@core/theme/SVGS/OkIcon';
import BackNav from '@components/BackNav';
import { Spacer } from '@components/Spacer';
import { Button } from '@components/Button';
import WarningIcon from '@core/theme/SVGS/WarningIcon';

/**
 * Types
 */

type ErrorCouponScreenProps = StackScreenProps<
  LoggedStackParamList,
  'ErrorScreenCouponBurn'
>;

const ErrorScreenCouponBurn: React.FC<ErrorCouponScreenProps> = ({
  navigation,
  route,
}) => {
  const style = useThemedStyles(styles);
  const { coupon } = route.params;
  return (
    <ScrollView contentContainerStyle={style.main}>
      <BackNav navigation={navigation} />
      <Spacer height={30} />
      {coupon ? (
        <View style={style.squareCoupon}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={style.text} numberOfLines={1} ellipsizeMode={'tail'}>
              {coupon.tittle}
            </Text>
            <Text style={style.number}>{`${coupon?.normalPrize
              .toFixed(2)
              .replace('.', ',')}€`}</Text>
          </View>
        </View>
      ) : null}
      <Spacer height={20} />
      <View style={style.square}>
        <WarningIcon size={50} styles={{ alignSelf: 'center' }} />
        <Spacer height={20} />
        <Text style={style.title}>ERRORE</Text>

        <Text style={{ textAlign: 'center' }}>Coupon non approvato</Text>
        <Spacer height={30} />

        <Image
          source={require('../../../../../../../assets/images/Image-error.png')}
          style={style.image}
        />
        <Spacer height={50} />
        <Button
          accessibilityLabel="torna alla home"
          title="TORNA ALLA HOME"
          onPress={() => navigation.goBack()}
          type="primary"
        />
      </View>
    </ScrollView>
  );
};

export default ErrorScreenCouponBurn;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    number: {
      fontSize: 25,
      fontFamily: theme.fonts.bold,
    },
    text: {
      fontSize: 18,
      fontFamily: theme.fonts.bold,
      width: 200,
    },
    square: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 20,
      borderRadius: 20,
    },
    squareCoupon: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: theme.colors.backgroundNegative,
      padding: 20,
      borderRadius: 20,
    },
    image: {
      width: 200,
      height: 180,
      alignSelf: 'center',
    },
    title: {
      fontSize: 16,
      fontFamily: theme.fonts.bold,
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
  });
