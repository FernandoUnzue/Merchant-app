import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SustitutionCardParamList } from '..';
import { FormInput } from '@components/FormInput';
import { Button } from '@components/Button';
import { ThemeContext, generalColorsNew, useThemedStyles } from '@core/theme';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@core/redux/store';
import { extendedApiUser } from '@core/redux/Api/endpoints/User';
import { useNavigation } from '@react-navigation/native';
import {
  useGetOperatorInfoQuery,
  useReplaceCardMutation,
} from '@core/redux/Api/endpoints/Webpos';
import { useError } from '@core/hooks/useError';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Types
 */

type HomeScreenSustitutionCardProps = StackScreenProps<
  SustitutionCardParamList,
  'SustitutionCardHomeScreen'
>;

const SustitutionCardHomeScreen: React.FC<HomeScreenSustitutionCardProps> = ({
  route,
  navigation,
}) => {
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

  const [replaceCard, { isLoading, isError, error }] = useReplaceCardMutation();

  const [username, setUsername] = useState<string>('');

  const operatorId = useSelector(
    (state: RootState) => state.auth.operatorInfo?.id,
  );
  const customer = useSelector((state: RootState) => state.customer);

  console.log(username);
  const { data } = useGetOperatorInfoQuery({
    username,
  });

  const actualCard = customer.card;

  const operator = useSelector((state: RootState) => state.auth.operatorInfo);

  const replaceCardFunc = async () => {
    await replaceCard({
      operatorId: operatorId ? operatorId : 0,
      card: customer?.card ? customer.card?.toString() : '0',
      newCard: watch('search'),
      notes: 'notes',
    })
      .unwrap()
      .then(() => {
        navigation.navigate('SuccessSustitutionCardScreen', {
          message: `Card ${actualCard} is changed to ${watch('search')}`,
        });
      })
      .catch(e => {
        navigation.navigate('ErrorSustitutionCardScreen', {
          message: `Error: ${e.data.message}`,
        });
      });
  };

  useEffect(() => {
    setValue('search', qrfound);
    trigger('search');
  }, [qrfound]);
  useEffect(() => {
    const getUsername = async () => {
      const username = await AsyncStorage.getItem('username');
      if (username) setUsername(username);
    };
    getUsername();
  }, [operatorId]);
  return (
    <ScrollView contentContainerStyle={style.main}>
      <Text style={style.title}>Sostituisci card</Text>
      <View style={style.container}>
        <FormInput
          control={control}
          name={'search'}
          placeholder="Inserisci il numero della nuova card"
          styless={{
            backgroundColor: 'transparent',
            borderBottomColor: generalColorsNew.orange,
          }}
          keyboardType={'numeric'}
          negativeColor={false}
          showIcons={false}
          rules={{
            minLength: 4,
          }}
        />

        <Button
          accessibilityLabel="SOSTITUISCI CARD"
          title="SOSTITUISCI CARD"
          type="primary"
          onPress={() => replaceCardFunc()}
          loading={isLoading}
          disabled={watch('sarch') !== '' && watch('search') ? false : true}
        />
        {/*isError ? (
          <Text
            style={{ color: 'red', textAlign: 'center', paddingVertical: 5 }}>
            {error?.data.message}
          </Text>
        ) : null*/}
      </View>
      <Image
        source={require('../../../../assets/images/img-scanner.png')}
        style={style.image}
      />
      <Text style={{ ...style.title, fontSize: 16 }}>Scanner Card Number</Text>
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

export default SustitutionCardHomeScreen;

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
      fontFamily: theme.fonts.instBold,
      fontSize: 22,
      textAlign: 'center',
      paddingBottom: 20,
      color: theme.colors.textPrimary,
    },
    container: {
      width: '100%',
      maxHeight: 350,
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
