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
  const dispatch = useDispatch<AppDispatch>();

  const isDarkTheme = useSelector((state: RootState) => state.auth.darkMode);
  const customer = useSelector((state: RootState) => state.customer);

  const [getMemberByCard, { isLoading, isFetching }, lastArgs] =
    extendedApiUser.endpoints.getMemberByCard.useLazyQuery();

  const funcGetMemberByCard = async (id: string) => {
    setLoading(true);
    await getMemberByCard({ card: id })
      .unwrap()
      .then(r => {
        setLoading(false);
        nav.navigate('Spesa' as never);
      })
      .catch(e => {
        setError({
          isError: true,
          message: 'Error with request please check card number',
        });
        console.log(e.data);
        resetError();
        setLoading(false);
      });
  };

  const nav = useNavigation();

  useEffect(() => {
    setValue('search', qrfound);
    trigger('search');
  }, [qrfound]);
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
          onPress={() => navigation.navigate('ConfirmSustitutionCardScreen')}
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
