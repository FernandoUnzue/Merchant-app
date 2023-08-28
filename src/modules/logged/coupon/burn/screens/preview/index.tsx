import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ColorsGeneralLight, ThemeContext, useThemedStyles } from '@core/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { LoggedStackParamList } from '@modules/logged';
import OkIcon from '@core/theme/SVGS/OkIcon';
import BackNav from '@components/BackNav';
import { Spacer } from '@components/Spacer';
import { Button } from '@components/Button';
import { useBurnCouponMutation } from '@core/redux/Api/endpoints/Coupon';
import moment from 'moment';

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
  const { isDirty, isValid, couponInfo, functionSubmit, valueSearch } =
    route.params;
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
    await burnCoupon({ exchangeCode: couponInfo?.exchangeCode })
      .unwrap()
      .then(r => {
        console.log(r);
        navigation.navigate('SuccessBurnCouponScreen', {
          coupon: couponInfo,
        });
      })
      .catch(error => {
        console.log(error);
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      functionSubmit(Number(valueSearch));
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={style.main}>
      <BackNav navigation={navigation} />
      <Text style={style.title}>Preview Screen Coupon Burn</Text>
      <Spacer height={50} />
      <View style={style.square}>
        <Text style={style.title1}>Coupon</Text>
        <Text style={style.bold}>Title:</Text>
        <Text>{couponInfo?.tittle}</Text>
        <Text style={style.bold}>Quantity:</Text>
        <Text>{couponInfo?.quantity}</Text>
        <Text style={style.bold}>Condition:</Text>
        <Text>{couponInfo?.condition}</Text>
        <Text style={style.bold}>Prize:</Text>
        <Text style={style.number}>{`${couponInfo?.normalPrize
          .toString()
          .replace('.', ',')}€`}</Text>
        <Text style={style.bold}>Promo Prize:</Text>
        <Text style={style.number}>{`${couponInfo?.promoPrize
          .toString()
          .replace('.', ',')}€`}</Text>
      </View>
      <Spacer height={50} />
      <Button
        accessibilityLabel="conferma"
        title="CONFERMA"
        onPress={() => burnCouponFunc()}
        loading={isLoading}
        type="primary"
        disabled={!isDirty || !isValid || couponInfo?.burnedDate !== null}
      />
      {couponInfo?.burnedDate !== null ? (
        <Text style={style.disabledText}>
          Coupon already burned at{' '}
          {moment(couponInfo?.burnedDate).format('DD/MM/YYYY hh:mm:ss A')}
        </Text>
      ) : null}
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
    number: {
      fontSize: 25,
      color: 'green',
      fontFamily: theme.fonts.bold,
    },
    bold: {
      fontSize: 14,
      fontFamily: theme.fonts.bold,
    },
    disabledText: {
      fontSize: 14,
      color: theme.colors.textDisabled,
      textAlign: 'center',
      paddingTop: 10,
    },
  });
