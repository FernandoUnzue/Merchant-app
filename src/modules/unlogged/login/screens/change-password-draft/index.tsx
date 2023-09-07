import { FC, useState } from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { isDirty, isValid },
  } = useForm<ChangePasswordData>({
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });
  const pwd = watch('password');

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
    }, 5000);
  };

  const onChangePasswordPressed = async ({
    oldPassword,
    password,
    rPassword,
  }: ChangePasswordData) => {
    setLoading(true);

    try {
      const response = await Api({
        endpoint: '/backoffice/change-password',
        method: 'PUT',
        _data: {
          oldPassword,
          newPassword: password,
          retryNewPassword: rPassword,
        },
        tokenUse: true,
      });
      setLoading(false);
      if (response.status === 200) {
        navigation.navigate('ChangePasswordSuccess');
      }
    } catch (e: any) {
      setLoading(false);
      // Alert.alert('Errore', 'Qualcosa è accaduto. Riprova');
      /**
       * si la contraseña vieja que pones no coincide con la del usuario te tira un 409 (conflict),
       * si la password es igual a una de las ultimas 3 que ingresaste te tira un 406 (not acceptable),
       * si la contraseña nueva que estas tratando de poner no pasa las validaciones tira un 406 (not acceptable)
       * lo mismo con el caso de que si la pass nueva no coincide con el retry de la pass
       */
      console.log('error: ' + e.response.status);
      if (e.response.status === 409) {
        setError({
          isError: true,
          message: 'Vecchia password errata',
        });
      }
      if (e.response.status === 406) {
        setError({
          isError: true,
          message: 'Nuova password non accettabile',
        });
      }
      if (e.response.status > 409) {
        setError({
          isError: true,
          message: 'Errore imprevisto riprovare',
        });
      }
      resetError();
    }
  };
  // validate live pass and confirm pass
  useEffect(() => {
    trigger('rPassword');
  }, [pwd]);

  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={style.main}>
      <Pressable onPress={() => Keyboard.dismiss()} style={container}>
        <Spacer />
        {error.isError && (
          <Text style={{ color: 'orange', textAlign: 'center' }}>
            {error.message}
          </Text>
        )}
        <BackNav navigation={navigation} />

        <View style={style.formWrapper}>
          <FormInput
            name="oldPassword"
            placeholder="Password attuale*"
            autoCapitalize="none"
            autoCorrect={false}
            control={control}
            rules={{
              required: true,
              pattern: PASSWORD_REGEX,
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
            rules={{
              required: true,
              pattern: PASSWORD_REGEX,
            }}
            onPasswordMessagePressed={() =>
              navigation.navigate('PasswordError' as never)
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
            confirmPass={true}
            passValue={watch('password')}
            rules={{
              validate: (value: string) =>
                value === pwd || 'Le password non coincidono',
            }}
            blurOnSubmit={false}
          />
        </View>
      </Pressable>

      <LoginFooter containerStyle={style.loginFooter}>
        <View style={{ width: '80%', alignSelf: 'center' }}>
          <Button
            accessibilityLabel="conferma"
            title="conferma"
            type="primary"
            loading={loading}
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
    </ScrollView>
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
      flexGrow: 1,
      paddingHorizontal: 80,
      justifyContent: 'center',
    },
    title: {
      fontFamily: theme.fonts.bold,
      fontSize: 22,
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    loginFooter: {
      justifyContent: 'space-between',
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
