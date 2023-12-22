import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { PonderazioneParamList } from '..';
import { ColorsGeneralDark, ThemeContext, useThemedStyles } from '@core/theme';
import { Spacer } from '@components/Spacer';
import { useError } from '@core/hooks/useError';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';
import {
  useGetOperatorInfoQuery,
  useGetPonderationQuery,
  useSetPonderationMutation,
} from '@core/redux/Api/endpoints/Webpos';
import { Button } from '@components/Button';
import { CurrencyFormInput } from '@components/CurrencyInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Types
 */

type HomeScreenPonderazioneProps = StackScreenProps<
  PonderazioneParamList,
  'PonderazioneHomeScreen'
>;

const PonderazioneHomeScreen: React.FC<HomeScreenPonderazioneProps> = ({
  route,
  navigation,
}) => {
  const style = useThemedStyles(styles);
  const { error, setError, resetError } = useError();
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    setValue,
    setFocus,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'onChange',
  });

  const [fixed, setFixed] = useState<boolean>(true);

  const cashback = watch('cashback');

  const [username, setUsername] = useState<string>('');

  const operatorId = useSelector(
    (state: RootState) => state.auth.operatorInfo?.id,
  );

  // console.log(operatorId);

  const [setPonderation, { isLoading }] = useSetPonderationMutation();

  const setPonderationFunc = async (max: number, min: number) => {
    await setPonderation({
      operatorId: operatorId ? operatorId : 0,
      weightChargePointMoney: max,
      weightChargePointPoints: min,
    })
      .unwrap()
      .then(r => {
        console.log('ponderation setted successfully');
        //  Router.push('/success-ponderazione');
        navigation.navigate('PonderazioneSuccess', { message: '' });
        setFixed(true);
        reset();
      })
      .catch(e => {
        console.log('ponderation setted successfully');
        navigation.navigate('PonderazioneError', { message: e.data.message });
      });
  };

  const {
    data: dataPonderazione,
    isSuccess,
    isLoading: loadingGetPond,
    refetch,
  } = useGetPonderationQuery({
    operatorId: operatorId ? operatorId : 0,
  });
  interface ponderazione {
    minWeight: number;
    maxWeight: number;
  }
  const [ponderazione, setPoderazione] = useState<ponderazione>({
    minWeight: 0,
    maxWeight: 0,
  });
  const {
    data,
    isLoading: loadingOperator,
    isError,
    error: errorGet,
  } = useGetOperatorInfoQuery({
    username,
  });

  useEffect(() => {
    setValue('priceLeft', Number(cashback ? cashback : 0) / 100);
    setValue('priceRight', 1.0);
  }, [cashback]);
  useEffect(() => {
    if (isSuccess)
      setPoderazione({
        minWeight: dataPonderazione.category.weightChargePointPoints,
        maxWeight: dataPonderazione.category.weightChargePointMoney,
      });
  }, [dataPonderazione]);

  useEffect(() => {
    const getUsername = async () => {
      const username = await AsyncStorage.getItem('username');
      if (username) setUsername(username);
    };
    getUsername();
  }, [operatorId]);

  return (
    <ScrollView contentContainerStyle={style.main}>
      <Spacer height={50} />
      <Text style={style.title}>Ponderazione cashback</Text>
      {fixed ? (
        <View>
          {isError && (
            <View>
              <Text style={{ ...style.title, color: ColorsGeneralDark.orange }}>
                Error getting ponderazione from {username}
              </Text>
            </View>
          )}
          {loadingOperator || loadingGetPond ? (
            <View style={{ paddingVertical: 100 }}>
              <ActivityIndicator size="large" color="#FF6E46" />
            </View>
          ) : (
            <View style={{ paddingHorizontal: 30 }}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    ...style.numberMain,
                    color: ColorsGeneralDark.orange,
                    paddingVertical: 0,
                  }}>
                  {Number(ponderazione.minWeight * 100).toFixed(1)}%
                </Text>
              </View>
              <Spacer height={30} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <Text style={style.numberSecondary}>
                  {ponderazione.minWeight.toFixed(3)}€
                </Text>
                <Text style={style.ogniText}>ogni</Text>
                <Text style={style.numberSecondary}>
                  {ponderazione.maxWeight.toFixed(3)}€
                </Text>
              </View>
              <Spacer height={30} />
              <Button
                type="primary"
                title="Modifica"
                accessibilityLabel="modifica"
                onPress={() => setFixed(false)}
              />
            </View>
          )}
        </View>
      ) : (
        <View style={{ padding: 20 }}>
          <CurrencyFormInput
            control={control}
            name="cashback"
            //  maxLength={3}
            placeholder={`${Number(ponderazione.minWeight * 100).toFixed(1)}%`}
            textStyles={style.numberMain}
            styless={{
              borderBottomWidth: 0,
            }}
            // constStyles={{ height: 100 }}
            suffix="%"
            rules={{
              required: true,
              validate: (value: any) =>
                Number(value) < 99 ||
                `Error with percent no more of 100% is possible`,
            }}
            keyboardType="numeric"
            cursorColor={'#000'}
            placeholderTextColor={'#ddd'}
            currency={false}
          />

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <CurrencyFormInput
              control={control}
              name="priceLeft"
              placeholder="0,100€"
              textStyles={style.numberSecondary}
              suffix="€"
              styless={{
                borderBottomWidth: 0,
              }}
              decimals={3}
              autoFocus={false}
              disabled={true}
              icon={false}
              currency={false}
              autoCorrect={false}
            />
            <Text style={{ ...style.ogniText, paddingTop: 10 }}>ogni</Text>
            <CurrencyFormInput
              control={control}
              name="priceRight"
              placeholder="1,000€"
              suffix="€"
              textStyles={style.numberSecondary}
              styless={{
                borderBottomWidth: 0,
              }}
              decimals={3}
              icon={false}
              disabled={true}
              currency={false}
            />
          </View>
          <Spacer height={30} />
          <Button
            type="primary"
            title="Conferma"
            onPress={() => setPonderationFunc(1.0, watch('priceLeft'))}
            disabled={!isDirty || !isValid}
            accessibilityLabel="conferma"
            loading={isLoading}
          />
          <Spacer height={10} />
          <Button
            type="tertiary"
            title="Anulla"
            accessibilityLabel="anulla"
            onPress={() => setFixed(true)}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default PonderazioneHomeScreen;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    numberMain: {
      fontSize: 65,
      height: 100,
      textAlign: 'center',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontFamily: theme.fonts.instBold,
    },
    numberSecondary: {
      fontSize: 25,
      height: 60,
      textAlign: 'center',
      fontFamily: theme.fonts.instMedium,
    },
    ogniText: {
      fontSize: 22,
      paddingTop: 0,
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
      fontFamily: theme.fonts.instBold,
      fontSize: 18,
      textAlign: 'center',
      paddingBottom: 20,
      color: theme.colors.textPrimary,
    },
    container: {
      width: '100%',
      // maxHeight: 350,
      //  backgroundColor: '#ddd',
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
