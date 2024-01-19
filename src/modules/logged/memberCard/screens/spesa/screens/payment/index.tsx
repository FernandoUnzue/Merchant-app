import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SpesaStackParamList } from '@modules/logged';
import { generalColorsNew, ThemeContext, useThemedStyles } from '@core/theme';
import Wallet from '@components/Wallet';
import { Spacer } from '@components/Spacer';
import UserBar from '@components/UserBar';
import { Button } from '@components/Button';
import { Checkbox } from '@components/Checkbox';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';
import { useError } from '@core/hooks/useError';
import { usePostSaleMutation } from '@core/redux/Api/endpoints/Webpos';
import { formatNumber } from '@core/helpers';

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
  const { amount, voucherId, discount, spesa } = route.params;

  const style = useThemedStyles(styles);
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    setValue,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'onChange',
    //   defaultValues: DEFAULT_VALUES,
    //   resolver: yupResolver(userSchema),
  });
  const isChecked = (value: boolean) => !!value;
  const customer = useSelector((state: RootState) => state.customer);

  const isEnoughtPoints = (): boolean => {
    if (customer.userInfo) {
      if (customer.userInfo?.balance.balancePoints >= amount) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const { error, setError, resetError } = useError();

  const [postSale, { isLoading }] = usePostSaleMutation();

  const funcSale = async (amount: number) => {
    await postSale({
      totalMoney: amount,
      cardMember: customer.card ? customer.card.toString() : '0',
      paymentMethod: 'MIA-BALANCE',
      voucherId: voucherId ? Number(voucherId) : null,
    })
      .unwrap()
      .then(r => {
        console.log(`sale registered successfully ${JSON.stringify(r)}`);
        navigation.navigate('SuccessSaleScreen', {
          customerId: r.customerId,
          card: r.card,
          campaignId: r.campaignId,
          campaignName: r.campaignName,
          movementId: r.movement.movementId,
          chargedPoints: r.movement.chargedPoints,
          shopName: r.movement.shopName,
          discount: r.movement.discount,
          dataTime: r.movement.dateTime,
          localTime: r.movement.localTime,
          amount,
          discountAmount: discount,
          spesa,
        });
      })
      .catch(error => {
        console.log(`saleerror ${JSON.stringify(error)}`);
        setError({
          isError: true,
          message: error.data.message,
        });
        resetError();
      });
  };

  useEffect(() => {
    setValue('payment', true);
    trigger('payment');
  }, [true]);
  return (
    <View style={style.main}>
      <Wallet />
      <Spacer height={20} />
      <View style={style.squareCoupon}>
        <View>
          {error.isError && (
            <Text
              //className="text-xl text-center text-[red] font-semibold"
              style={{ color: 'red', textAlign: 'center', fontSize: 16 }}>
              {error.message}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={style.text} numberOfLines={1} ellipsizeMode={'tail'}>
            Totale a pagare
          </Text>
          <Text style={style.number}>{`€${formatNumber(spesa, 2)}`}</Text>
        </View>
      </View>
      <Spacer height={20} />
      <View style={style.square}>
        <Text style={style.textRegular}>Select payment method:</Text>
        <Spacer height={30} />
        {/* <View style={style.checkboxWrapper}>
          <Checkbox
            name="payment"
            control={control}
            rules={{
              required: true,
            }}
            styless={{
              borderRadius: 100,
              width: 25,
              height: 25,
              borderWidth: 3,
              marginTop: 13,
            }}
            // parameter={isEnoughtPoints()}
            //  nameParent={'stripe-balance'}
            disabled={true}
            setValue={setValue}
            borderColor={'#000'}
            symbol={
              <View
                style={{
                  backgroundColor: generalColorsNew.textGrey,
                  width: '90%',
                  height: '90%',
                  borderRadius: 100,
                }}></View>
            }
          />
          <Text style={{ ...style.textPayment, marginTop: 15 }}>
            {' '}
            Credito de wallet MIA{' '}
          </Text>

          <Image
            source={require('../../../../../../../../assets/images/mia-logo.png')}
            style={{
              width: 90,
              height: 45,
            }}
          />
          </View>*/}
        {isLoading ? (
          <ActivityIndicator
            size={'large'}
            color={'#FF6E46'}
            style={{ alignSelf: 'center', marginTop: 30 }}
          />
        ) : null}
      </View>
      <Spacer height={20} />
      <UserBar />
      <Spacer height={10} />
      <Button
        type="primary"
        title="conferma pagamento"
        accessibilityLabel="conferma pagamento"
        onPress={() => funcSale(amount)}
        loading={isLoading}
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
      fontFamily: theme.fonts.instBold,
      fontWeight: 'bold',
    },
    textRegular: {
      fontSize: 12,
      fontFamily: theme.fonts.instRegular,
      color: theme.colors.textGrey,
    },
    text: {
      fontSize: 12,
      fontFamily: theme.fonts.instBold,
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
    checkboxWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      paddingVertical: 20,
      borderColor: theme.colors.textGrey,
    },
    textPayment: {
      paddingLeft: 10,
      fontSize: 15,
      fontFamily: theme.fonts.bold,
      marginTop: 5,
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
