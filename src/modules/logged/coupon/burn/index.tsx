import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { LoggedStackParamList } from '../..';
import ToggleMenu from '@components/ToggleMenu';
import { ColorsGeneralDark, ThemeContext, useThemedStyles } from '@core/theme';
import { useForm } from 'react-hook-form';
import { FormInput } from '@components/FormInput';
import { Button } from '@components/Button';
import BackNav from '@components/BackNav';
import { useDispatch } from 'react-redux';
import { AuthSlice } from '@core/redux/authSlice/authSlice';
import { Spacer } from '@components/Spacer';
import {
  useGetCouponByECQuery,
  useGetOfferCouponQuery,
} from '@core/redux/Api/endpoints/Coupon';
import { Coupon } from '@core/interfaces';
import { Api } from '@core/clients/axioss';
import CameraScanner from '@components/CameraBarCodeScanner';
import ButtonFlat from '@components/ButtonFlat';

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

  const getOfferCouponInfo = async (id: number) => {
    try {
      setLoading(true);
      const response = await Api({
        endpoint: `/merchant/offer-coupon/buy`,
        params: { filter: `exchangeCode,${id}` },
      });
      if (response.status === 200) {
        navigation.navigate('PreviewScreenCouponBurn', {
          isDirty: isDirty,
          isValid: isValid,
          couponInfo: response.data.content[0],
          valueSearch: watch('search'),
          functionSubmit: getOfferCouponInfo,
        });
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
  const validateField = async () => {};

  useEffect(() => {
    setValue('search', qrfound);
    trigger('search');
  }, [qrfound]);

  return (
    <ScrollView contentContainerStyle={style.main}>
      <BackNav navigation={navigation} />
      <Text style={style.title}>Burn Coupon</Text>
      <View style={style.container}>
        <FormInput
          control={control}
          name={'search'}
          placeholder="EXCHANGE CODE"
          styless={{
            backgroundColor: 'transparent',
          }}
          showIcons={false}
          rules={{
            minLength: 4,
          }}
        />

        <Button
          accessibilityLabel="incerisi"
          title="INSERICI"
          type="primary"
          onPress={() => getOfferCouponInfo(watch('search'))}
          loading={loading}
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
        <ButtonFlat
          title="APRI LA FOTOCAMERA"
          widthButton="200"
          heightButton={55}
          color={ColorsGeneralDark.background}
          textStyles={{
            color: 'white',
          }}
          fontSize={16}
          styless={{
            borderRadius: 100,
          }}
          onPress={() => navigation.navigate('CameraScannerScreen')}
        />
      </View>
      {/*  <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          maxHeight: windowHeigth - 155,
        }}>
        <ToggleMenu navigation={navigation} />
      </View>*/}
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
