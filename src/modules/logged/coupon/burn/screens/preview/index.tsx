import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ColorsGeneralLight, ThemeContext, useThemedStyles } from '@core/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { LoggedStackParamList } from '@modules/logged';
import OkIcon from '@core/theme/SVGS/OkIcon';
import BackNav from '@components/BackNav';
import { Spacer } from '@components/Spacer';
import { Button } from '@components/Button';
import { useBurnCouponMutation } from '@core/redux/Api/endpoints/Merchant';

/**
 * Types
 */

type PreviewScreenCouponBurnProps = StackScreenProps<
  LoggedStackParamList,
  'PreviewScreenCouponBurn'
>;

const PreviewScreenCouponBurn: React.FC<PreviewScreenCouponBurnProps> = ({
  navigation,
  route,
}) => {
  const { isDirty, isValid, couponInfo } = route.params;
  const style = useThemedStyles(styles);

  const [burnCoupon, { isLoading }] = useBurnCouponMutation();

  const [error, setError] = useState<{ isError: boolean; message: string }>({
    isError: false,
    message: '',
  });

  const resetError = () => {
    setTimeout(() => {
      setError({
        isError: false,
        message: '',
      });
    }, 3000);
  };

  const burnCouponFunc = async () => {
    await burnCoupon({ merchantFNId: couponInfo?.fnetCatalogId })
      .unwrap()
      .then(() => {
        navigation.navigate('SuccessBurnCouponScreen', {
          coupon: couponInfo,
        });
      })
      .catch(error => {
        navigation.navigate('ErrorScreenCouponBurn', {
          coupon: couponInfo,
        });
        setError({
          isError: true,
          message: 'Error with request',
        });
        resetError();
      });
  };

  return (
    <ScrollView contentContainerStyle={style.main}>
      <BackNav navigation={navigation} />
      <Text style={style.title}>Preview Screen Coupon Burn</Text>
      <Spacer height={50} />
      <View style={style.square}>
        <Text style={style.title1}>Coupon</Text>
        <Text>Title:</Text>
        <Text>{couponInfo?.tittle}</Text>
        <Text>Quantity:</Text>
        <Text>{couponInfo?.quantity}</Text>
        <Text>Description:</Text>
        <Text>{couponInfo?.description}</Text>
        <Text>Condition:</Text>
        <Text>{couponInfo?.condition}</Text>
        <Text>Prize:</Text>
        <Text>{couponInfo?.normalPrize}</Text>
        <Text>Promo Prize:</Text>
        <Text>{couponInfo?.promoPrize}</Text>
      </View>
      <Spacer height={50} />
      <Button
        accessibilityLabel="conferma"
        title="CONFERMA"
        onPress={() => burnCouponFunc()}
        loading={isLoading}
        type="primary"
        disabled={!isDirty || !isValid}
      />
    </ScrollView>
  );
};

export default PreviewScreenCouponBurn;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    square: {
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    title: {
      fontSize: 22,
      fontFamily: theme.fonts.bold,
      color: theme.colors.textPrimary,
    },
    title1: {
      fontSize: 18,
      fontFamily: theme.fonts.bold,
      textAlign: 'center',
      paddingBottom: 20,
    },
  });
