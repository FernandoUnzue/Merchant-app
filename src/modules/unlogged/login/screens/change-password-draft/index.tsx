import { FC, useState } from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';

import { ThemeContext, useTheme, useThemedStyles } from '@core/theme';
import { useDisableGoBack } from '@core/hooks';
import { useLoginContainer } from '@modules/unlogged/hooks';
import { UnloggedStackParamList } from '@modules/unlogged';
import { FormInput } from '@components/FormInput';
import { LoginFooter } from '@components/LoginFooter';
import { Spacer } from '@components/Spacer';
import { WhiskeredButton } from '@components/WhiskeredButton';
import { PASSWORD_REGEX } from '@core/constants';
import axiosInstance from '@core/clients/axios';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Api } from '@core/clients/axioss';
import { BASIC_AUTH_PASSWORD, BASIC_AUTH_USERNAME } from 'react-native-dotenv';
import { LoggedStackParamList } from '@modules/logged';
import ArrowLeftBack from '@core/theme/SVGS/ArrowLeftBack';
import { Button } from '@components/Button';
import BackNav from '@components/BackNav';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';
import { useError } from '@core/hooks/useError';
import { useChangePassOperatorMutation } from '@core/redux/Api/endpoints/operator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/**
 * Types
 */

type ChangePasswordScreenProps = StackScreenProps<
  LoggedStackParamList,
  'ChangePasswordDraft'
>;

type ChangePasswordData = {
  oldPassword: string;
  password: string;
  rPassword: string;
};

/**
 * Constants
 */

const DEFAULT_VALUES: ChangePasswordData = {
  oldPassword: '',
  password: '',
  rPassword: '',
};

const SUCCESS_RESPONSE = 'Your password succesfully updated.';

/**
 * ChangePasswordDraft Screen
 * TODO: To be replaced by the definitive screen
 */

export const ChangePasswordDraft: FC<ChangePasswordScreenProps> = ({
  navigation,
}) => {
  useDisableGoBack();
  const style = useThemedStyles(styles);
  const { container } = useLoginContainer();

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { isDirty, isValid },
  } = useForm<ChangePasswordData>({
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });
  const pwd = watch('password');

  const { error, setError, resetError } = useError();

  const [changePassOperator, { isLoading }] = useChangePassOperatorMutation();

  const onChangePasswordPressed = async ({
    oldPassword,
    password,
    rPassword,
  }: ChangePasswordData) => {
    await changePassOperator({
      oldPassword,
      newPassword: password,
      retryNewPassword: rPassword,
    })
      .unwrap()
      .then(r => {
        console.log(`successfully change password ${r}`);
        navigation.navigate('ChangePasswordSuccess');
      })
      .catch(e => {
        /**
         * si la contraseña vieja que pones no coincide con la del usuario te tira un 409 (conflict),
         * si la password es igual a una de las ultimas 3 que ingresaste te tira un 406 (not acceptable),
         * si la contraseña nueva que estas tratando de poner no pasa las validaciones tira un 406 (not acceptable)
         * lo mismo con el caso de que si la pass nueva no coincide con el retry de la pass
         */
        //   console.log("error: " + JSON.stringify(e));
        if (e.status === 409) {
          setError({
            isError: true,
            message: 'Vecchia password errata',
          });
        }
        if (e.status === 406) {
          setError({
            isError: true,
            message: 'Nuova password non accettabile',
          });
        }
        if (e.status > 409 || e.status < 405) {
          setError({
            isError: true,
            message: 'Errore imprevisto riprovare',
          });
        }
        resetError();
      });
  };
  const isDarkTheme = useSelector((state: RootState) => state.auth.darkMode);
  const colorScheme = useColorScheme();
  // validate live pass and confirm pass
  useEffect(() => {
    trigger('rPassword');
  }, [pwd]);

  useEffect(() => {
    reset();
  }, []);

  const theme = useTheme();

  return (
    <KeyboardAwareScrollView contentContainerStyle={style.main}>
      <View>
        <Spacer />
        {error.isError && (
          <Text style={{ color: 'orange', textAlign: 'center' }}>
            {error.message}
          </Text>
        )}
        <Text style={style.title}>Cambia Password</Text>
        <Spacer height={10} />
        <Text style={style.subtitle}>Regole di creazione password</Text>
        <Spacer height={10} />
        <View>
          <Text>* Lorem ipsum dolor sit amet</Text>
          <Text>* Lorem ipsum dolor sit amet</Text>
          <Text>* Lorem ipsum dolor sit amet</Text>
          <Text>* Lorem ipsum dolor sit amet</Text>
          <Text>* Lorem ipsum dolor sit amet</Text>
        </View>
        <Spacer height={40} />
        <View style={style.formWrapper}>
          <FormInput
            name="oldPassword"
            placeholder="Password attuale*"
            autoCapitalize="none"
            autoCorrect={false}
            control={control}
            //   negativeColor={isDarkTheme || colorScheme === 'dark' ? true : false}
            rules={{
              required: true,
              pattern: PASSWORD_REGEX,
            }}
            styless={{
              backgroundColor: 'transparent',
            }}
            //  onPasswordMessagePressed={() => navigate('PasswordError')}
            blurOnSubmit={false}
          />
          <Spacer height={16} />
          <FormInput
            name="password"
            placeholder="Scegli nuova Password*"
            autoCapitalize="none"
            autoCorrect={false}
            control={control}
            //   negativeColor={isDarkTheme || colorScheme === 'dark' ? true : false}
            rules={{
              required: true,
              pattern: PASSWORD_REGEX,
            }}
            styless={{
              backgroundColor: 'transparent',
            }}
            onPasswordMessagePressed={() =>
              navigation.navigate('PasswordError')
            }
            blurOnSubmit={false}
          />
          <Spacer height={16} />
          <FormInput
            name="rPassword"
            placeholder="Conferma Password*"
            autoCapitalize="none"
            autoCorrect={false}
            control={control}
            disablePaste
            //    negativeColor={isDarkTheme || colorScheme === 'dark' ? true : false}
            confirmPass={true}
            passValue={watch('password')}
            styless={{
              backgroundColor: 'transparent',
            }}
            rules={{
              validate: (value: string) =>
                value === pwd || 'Le password non coincidono',
            }}
            blurOnSubmit={false}
          />
        </View>
      </View>
      <Spacer height={100} />
      <LoginFooter containerStyle={style.loginFooter}>
        <View style={{ width: '100%', alignSelf: 'center' }}>
          <Button
            accessibilityLabel="conferma"
            title="conferma"
            type="primary"
            loading={isLoading}
            disabled={!isDirty || !isValid}
            onPress={handleSubmit(onChangePasswordPressed)}
          />
        </View>
        {/*   <Text style={style.loginWrapper}>
          <Text style={style.goback}>Torna alla </Text>
          <Text
            style={style.loginLink}
            suppressHighlighting
            onPress={() => navigate('Login')}>
            Login
          </Text>
          </Text>*/}
      </LoginFooter>
    </KeyboardAwareScrollView>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      padding: 10,
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    formWrapper: {
      //  flexGrow: 1,
      paddingHorizontal: 10,
      justifyContent: 'center',
    },
    title: {
      fontFamily: theme.fonts.bold,
      fontSize: 20,
      color: theme.colors.textPrimary,
    },
    subtitle: {
      fontFamily: theme.fonts.bold,
      fontSize: 14,
      color: theme.colors.textPrimary,
    },
    loginFooter: {
      justifyContent: 'space-between',
    },
    backNegative: {
      backgroundColor: 'transparent',
      color: theme.colors.textPrimary,
    },
    back: {
      backgroundColor: 'transparent',
    },
    loginWrapper: {
      textAlign: 'center',
      marginBottom: 85,
    },
    goback: {
      fontFamily: theme.fonts.regular,
      fontSize: 16,
      color: theme.colors.textPrimary,
    },
    loginLink: {
      fontFamily: theme.fonts.bold,
      fontSize: 16,
      color: theme.colors.textPrimary,
    },
  });
