import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { MemberCardStackParamList, SpesaStackParamList } from '@modules/logged';
import { ColorsGeneralDark, ThemeContext, useThemedStyles } from '@core/theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@core/redux/store';
import BackNav from '@components/BackNav';
import { Spacer } from '@components/Spacer';
import { Button } from '@components/Button';
import { CustomerSlice } from '@core/redux/customerSlice';
import { Alert } from 'react-native';

import { useForm } from 'react-hook-form';
import { CurrencyFormInput } from '@components/CurrencyInput';
import EuroIcon from '@core/theme/SVGS/NavBar/Euro';
import Impostazioni from '@core/theme/Merchant/Impostazioni';
import { useNavigation } from '@react-navigation/native';
import { extendedApiUser } from '@core/redux/Api/endpoints/User';

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
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'onChange',
  });
  const customer = useSelector((state: RootState) => state.customer);
  const user = useSelector((state: RootState) => state.customer.userInfo);

  const amount = customer.amount ? customer.amount : 0;
  const dispatch = useDispatch<AppDispatch>();

  const nav = useNavigation();

  return (
    <View style={style.main}>
      <Spacer height={20} />
      <View style={style.walletCont}>
        <EuroIcon size={15} color={style.textWallet.color} />
        <Text style={style.textWallet}>Saldo Wallet</Text>
        <Text style={style.textWalletNumber}>{`${
          customer.amount
            ? customer.amount?.toFixed(2).replace('.', ',')
            : '-----'
        }€`}</Text>
      </View>
      <Text style={style.title}>SPESA</Text>

      <Text style={style.textBold}>Inserisci importo</Text>

      <CurrencyFormInput
        icon={false}
        control={control}
        name="importo"
        placeholder="€0,00"
        cursorColor={'#ddd'}
        keyboardType="number-pad"
        styless={style.numberCont}
        style={style.number}
        errorMessagesStyles={style.errorMessage}
        rules={{
          required: true,
          validate: (value: any) =>
            Number(value) <= amount ||
            `Saldi insifficienti ${amount.toFixed(2)}€ disponibili`,
        }}
      />
      <Spacer height={30} />
      <View style={style.squareContent}>
        <View style={style.square}>
          <Impostazioni size={20} />
          <Spacer height={35} />
          <Text style={style.text}>Cardholder name</Text>
          <Text>
            {user?.first_name} {user?.last_name}
          </Text>
        </View>
        <View
          style={{
            ...style.square,
            backgroundColor: '#ddd',
          }}>
          <Impostazioni size={20} />
          <Spacer height={35} />
          <Text style={style.text}>Numero card</Text>
          <Text style={style.textBold}>{customer.card}</Text>
        </View>
      </View>

      <Spacer height={180} />

      <Button
        type="primary"
        accessibilityLabel="CONFERMA"
        title="CONFERMA"
        onPress={() => null}
        disabled={!isDirty || !isValid}
      />
      <Spacer height={10} />
      <Button
        type="secondary"
        accessibilityLabel="REMOVE CUSTOMER"
        title="REMOVE CUSTOMER"
        onPress={() => {
          dispatch(CustomerSlice.actions.removeCustomer());
          nav.navigate('MemberCardStack' as never);
        }}
      />
      <Spacer height={20} />
    </View>
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
    },
    text: {
      fontSize: 12,
      color: theme.colors.textPrimary,
    },
    numberCont: {
      fontFamily: theme.fonts.bold,
      color: '#ddd',
      borderBottomWidth: 0,
      //  width: 250,
    },
    number: {
      fontSize: 50,
      fontFamily: theme.fonts.bold,
      color: theme.colors.backgroundNegative,
    },
    textBold: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
    },
    squareContent: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    square: {
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#fff',
      padding: 10,
      width: 150,
      height: 120,
      borderRadius: 10,
    },
    walletCont: {
      borderWidth: 1,
      borderColor: theme.colors.backgroundNegative,
      width: 200,
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'flex-end',
    },
    textWallet: {
      fontSize: 12,
      color: theme.colors.backgroundNegative,
    },
    textWalletNumber: {
      fontSize: 13,
      fontFamily: theme.fonts.bold,
      color: theme.colors.backgroundNegative,
    },
    errorMessage: {
      color: theme.colors.backgroundNegative,
    },
  });
