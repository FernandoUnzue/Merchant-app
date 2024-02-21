import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { MemberCardStackParamList, SpesaStackParamList } from '@modules/logged';
import {
  ColorsGeneralDark,
  generalColorsNew,
  ThemeContext,
  useThemedStyles,
} from '@core/theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@core/redux/store';
import BackNav from '@components/BackNav';
import { Spacer } from '@components/Spacer';
import { Button } from '@components/Button';
import { CustomerSlice } from '@core/redux/customerSlice';
import { Alert } from 'react-native';

import { useForm, useWatch } from 'react-hook-form';
import { CurrencyFormInput } from '@components/CurrencyInput';
import EuroIcon from '@core/theme/SVGS/NavBar/Euro';
import Impostazioni from '@core/theme/Merchant/Impostazioni';
import { useNavigation } from '@react-navigation/native';
import {
  extendedApiUser,
  useGetUserProfileQuery,
} from '@core/redux/Api/endpoints/User';
import { FakeCurrencyInput } from 'react-native-currency-input';
import UserIcon from '@core/theme/SVGS/Merchant/UserIcon';
import WalletIcon from '@core/theme/SVGS/Merchant/WalletEMpty';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserBar from '@components/UserBar';
import Wallet from '@components/Wallet';
import useKeyboard from '@core/hooks/isKeyboardOpen';

/**
 * Types
 */

type SpesaHomeProps = StackScreenProps<SpesaStackParamList, 'HomeSpesa'>;

const HomeSpesa: React.FC<SpesaHomeProps> = ({ navigation }) => {
  const style = useThemedStyles(styles);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'onChange',
  });
  const customer = useSelector((state: RootState) => state.customer);
  const user = useSelector((state: RootState) => state.customer.userInfo);

  const [number, setNumber] = useState<number>(0);

  const { width, height } = useWindowDimensions();

  const amount = customer.amount ? customer.amount : 0;
  const dispatch = useDispatch<AppDispatch>();

  const nav = useNavigation();

  const isOpen = useKeyboard();

  useEffect(() => {
    //  trigger('importo');
    if (Platform.OS === 'android') {
      setValue('importo', 0);
    } else {
      setValue('importo', undefined);
    }
  }, [customer]);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      enableAutomaticScroll
      contentContainerStyle={style.main}
      keyboardShouldPersistTaps="always">
      <Spacer height={20} />
      <Wallet />
      <Spacer height={10} />
      <Text style={style.title}>SPESA</Text>
      <Spacer height={10} />
      <Text style={style.textBold}>Inserisci importo</Text>
      <Spacer height={10} />
      <CurrencyFormInput
        icon={false}
        control={control}
        name="importo"
        placeholder={Platform.OS === 'ios' ? '0,00' : undefined}
        keyboardType="numeric"
        styless={style.numberCont}
        style={style.number}
        currency={false}
        constStyles={{
          alignSelf: 'center',
          width: Math.floor(width / 2),
        }}
        defaultValue={Platform.OS === 'android' ? '0' : ''}
        cursorColor={'#000'}
        valueAdded={
          <Text
            style={{
              color: generalColorsNew.orange,
              fontSize: style.number.fontSize,
              fontFamily: style.number.fontFamily,
              marginTop: 8,
            }}>
            €
          </Text>
        }
        // errorMessagesStyles={style.errorMessage}
        //    rules={{
        //     required: true,
        //     validate: (value: any) =>
        //       Number(value) >= 0 || `Il importo deve essere maggiore di 0,00€`,
        //   }}
      />
      <Spacer height={30} />
      <UserBar />

      <Spacer height={isOpen ? 40 : 150} />

      <Button
        type="primary"
        accessibilityLabel="CONFERMA"
        title="CONFERMA"
        onPress={() =>
          navigation.navigate('ResumeSaleScreen', {
            amount: Number(watch('importo')),
          })
        }
        disabled={watch('importo') && watch('importo') > 0 ? false : true}
      />
      {/* <Spacer height={10} />
      <Button
        type="secondary"
        accessibilityLabel="REMOVE CUSTOMER"
        title="REMOVE CUSTOMER"
        onPress={() => {
          dispatch(CustomerSlice.actions.removeCustomer());
          nav.navigate('MemberCardStack' as never);
        }}
      />*/}
    </KeyboardAwareScrollView>
  );
};

export default HomeSpesa;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 10,
    },
    title: {
      fontSize: 12,
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    text: {
      fontSize: 10,
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    numberCont: {
      fontFamily: theme.fonts.bold,
      color: '#ddd',
      borderBottomWidth: 0,
      verticalAlign: 'center',
      width: 250,
    },
    number: {
      fontSize: 50,
      fontFamily: theme.fonts.bold,
      color: '#173E46',
      textAlign: 'center',
    },
    textBold: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    squareContent: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      borderRadius: 50,
    },
    square: {
      //    borderWidth: 1,
      borderColor: '#ddd',
      //   backgroundColor: '#fff',
      padding: 10,
      width: 120,
      height: 110,
      borderRadius: 10,
      textAlign: 'center',
    },
    walletCont: {
      borderWidth: 1,
      borderColor: theme.colors.textPrimary,
      width: 185,
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
    textWallet: {
      marginTop: 2,
      fontSize: 12,
      color: theme.colors.textPrimary,
    },
    textWalletNumber: {
      fontSize: 13,
      fontFamily: theme.fonts.bold,
      color: theme.colors.textPrimary,
    },
    errorMessage: {
      fontSize: 10,
      color: theme.colors.textPrimary,
    },
  });
