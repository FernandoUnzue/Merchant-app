import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { LoggedStackParamList } from '../..';
import { ColorsGeneralDark, ThemeContext, useThemedStyles } from '@core/theme';
import { useForm } from 'react-hook-form';
import { FormInput } from '@components/FormInput';
import { Button } from '@components/Button';
import { Api } from '@core/clients/axioss';
import ButtonFlat from '@components/ButtonFlat';
import { CouponBuy } from '@core/interfaces';
import { useClipboard } from '@react-native-community/clipboard';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';
import { ApiRedux } from '@core/redux/Api/api';
import { extendedApiCoupon } from '@core/redux/Api/endpoints/Coupon';
import { Alert } from 'react-native';

/**
 * Types
 */

type HomeScreenBurnCouponProps = StackScreenProps<
  LoggedStackParamList,
  'HomeBurnCoupon'
>;

const Home: React.FC<HomeScreenBurnCouponProps> = ({ navigation, route }) => {
  const { height: windowHeigth, width: windowWidth } = useWindowDimensions();

  const { qrfound } = route.params;

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

  const [loading, setLoading] = useState<boolean>(false);

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

  const [exchangeCode, setExchangeCode] = useState<number>();
  const [coupon, setCoupon] = useState<CouponBuy>();

  const [getCouponByEC, { isLoading, isFetching }, lastArgs] =
    extendedApiCoupon.endpoints.getCouponByEC.useLazyQuery();

  const funcGetCoupon = async (id: number) => {
    setLoading(true);
    await getCouponByEC({ exchangeCode: id })
      .unwrap()
      .then(r => {
        if (r.content.length > 0) {
          setLoading(false);
          setCoupon(r.content[0]);
          navigation.navigate('PreviewScreenCouponBurn', {
            couponInfo: r.content[0],
            valueSearch: watch('search'),
            functionSubmit: getOfferCouponInfo,
          });
        } else {
          setError({
            isError: true,
            message: 'Not exist coupon with this exchange code',
          });
          resetError();
        }
      })
      .catch(e => {
        setError({
          isError: true,
          message: 'Error with request check exchange code',
        });
        console.log(e.data);
        resetError();
        setLoading(false);
      });
  };

  const getOfferCouponInfo = async (id: number) => {
    try {
      setLoading(true);
      const response = await Api({
        endpoint: `/merchant/offer-coupon/buy`,
        params: { filter: `exchangeCode,${id}` },
      });
      if (response.status === 200) {
        if (response.data.content.length > 0) {
          setCoupon(response.data.content[0]);
          navigation.navigate('PreviewScreenCouponBurn', {
            couponInfo: response.data.content[0],
            valueSearch: watch('search'),
            functionSubmit: getOfferCouponInfo,
          });
        } else {
          setError({
            isError: true,
            message: 'Not exist coupon with this exchange code',
          });
          resetError();
        }
      }
      setLoading(false);
    } catch (error: any) {
      setError({
        isError: true,
        message: 'Error with request check exchange code',
      });
      console.log(error.response.data);
      resetError();
      setLoading(false);
    }
  };
  const isDarkTheme = useSelector((state: RootState) => state.auth.darkMode);
  const colorScheme = useColorScheme();

  useEffect(() => {
    setValue('search', qrfound);
    trigger('search');
  }, [qrfound]);

  return (
    <ScrollView contentContainerStyle={style.main}>
      <Text style={style.title}>Burn Coupon</Text>
      <View style={style.container}>
        <FormInput
          control={control}
          name={'search'}
          placeholder="EXCHANGE CODE"
          styless={{
            backgroundColor: 'transparent',
          }}
          negativeColor={false}
          showIcons={false}
          rules={{
            minLength: 4,
          }}
        />

        <Button
          accessibilityLabel="incerisi"
          title="INSERICI"
          type="primary"
          onPress={() => funcGetCoupon(watch('search'))}
          loading={isLoading || isFetching}
          disabled={watch('sarch') !== '' && watch('search') ? false : true}
        />
        {error.isError ? (
          <Text
            style={{ color: 'red', textAlign: 'center', paddingVertical: 5 }}>
            {error.message}
          </Text>
        ) : null}
      </View>
      <Image
        source={require('../../../../../assets/images/barras.png')}
        style={style.image}
      />
      <Text style={{ ...style.title, fontSize: 16 }}>Scanner BarCode</Text>
      <View
        style={{
          alignSelf: 'center',
          width: 250,
        }}>
        <Button
          stylesTitle={{
            fontSize: 16,
          }}
          title="APRI LA FOTOCAMERA"
          accessibilityLabel="APRI LA FOTOCAMERA"
          type="primary"
          onPress={() => navigation.navigate('CameraScannerScreen')}
        />
      </View>
    </ScrollView>
  );
};

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    image: {
      width: '100%',
      alignSelf: 'center',
    },
    backNegative: {
      backgroundColor: theme.colors.backgroundNegative,
      color: theme.colors.textPrimary,
    },
    title: {
      fontFamily: theme.fonts.bold,
      fontSize: 22,
      textAlign: 'center',
      paddingBottom: 20,
      color: theme.colors.textPrimary,
    },
    container: {
      width: '100%',
      maxHeight: 350,
      backgroundColor: '#ddd',
      padding: 20,
      alignSelf: 'center',
      paddingBottom: 50,
      borderRadius: 30,
      // opacity: 0.7,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });

export default Home;
