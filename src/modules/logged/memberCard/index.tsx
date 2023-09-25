import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import BackNav from '@components/BackNav';
import { StackScreenProps } from '@react-navigation/stack';
import { DrawerStackParamList } from '../drawer';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@core/redux/store';
import { FormInput } from '@components/FormInput';
import { Button } from '@components/Button';
import { MemberCardStackParamList } from '..';
import { CustomerSlice } from '@core/redux/customerSlice';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { extendedApiUser } from '@core/redux/Api/endpoints/User';

/**
 * Types
 */

type HomeScreenMemberCardProps = StackScreenProps<
  MemberCardStackParamList,
  'MemberCardHome'
>;

const MemberCardHome: FC<HomeScreenMemberCardProps> = ({
  navigation,
  route,
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
  const colorScheme = useColorScheme();
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

  {
    /*  if (customer.registered) {
    nav.navigate('Spesa' as never);
  }
*/
  }

  return (
    <ScrollView contentContainerStyle={style.main}>
      <Text style={style.title}>Member Card</Text>
      <View style={style.container}>
        <FormInput
          control={control}
          name={'search'}
          placeholder="MEMBER CARD"
          styless={{
            backgroundColor: 'transparent',
          }}
          keyboardType={'numeric'}
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
          onPress={() => funcGetMemberByCard(watch('search'))}
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

export default MemberCardHome;
