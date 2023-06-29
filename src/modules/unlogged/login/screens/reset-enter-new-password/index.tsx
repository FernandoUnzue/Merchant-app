import { FC, useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { useDisableGoBack } from '@core/hooks';
import { useLoginContainer } from '@modules/unlogged/hooks';
import { UnloggedStackParamList } from '@modules/unlogged';
import { FormInput } from '@components/FormInput';
import { LoginFooter } from '@components/LoginFooter';
import { Spacer } from '@components/Spacer';
import { WhiskeredButton } from '@components/WhiskeredButton';
import { PASSWORD_REGEX } from '@core/constants';
import axiosInstance from '@core/clients/axios';
import { Api } from '@core/clients/axioss';

/**
 * Types
 */

type ResetEnterNewPasswordScreenProps = StackScreenProps<
  UnloggedStackParamList,
  'ResetEnterNewPassword'
>;

type ResetEnterNewPasswordData = {
  password: string;
  rPassword: string;
};

/**
 * Constants
 */

const DEFAULT_VALUES: ResetEnterNewPasswordData = {
  password: '',
  rPassword: '',
};

const SUCCESS_RESPONSE = 'Your password succesfully updated.';

/**
 * ResetEnterNewPassword Screen
 */

export const ResetEnterNewPassword: FC<ResetEnterNewPasswordScreenProps> = ({
  route: {
    params: { phone, code },
  },
  navigation: { navigate },
}) => {
  {
    /* useEffect(() => {
    if (phone && code) {
      Alert.alert(phone, code);
    }
  }, [phone, code]);*/
  }
  useDisableGoBack();
  const style = useThemedStyles(styles);
  const { container } = useLoginContainer();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { isDirty, isValid },
  } = useForm<ResetEnterNewPasswordData>({
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });
  const pwd = watch('password');

  console.log(phone, code);
  const resetError = () => {
    setTimeout(() => {
      setError('');
    }, 5000);
  };
  const onResetEnterNewPasswordPressed = async ({
    password,
    rPassword,
  }: ResetEnterNewPasswordData) => {
    console.log('Button pressed');
    setLoading(true);

    try {
      const response = await Api({
        endpoint: '/api/user/reset/change-password',
        method: 'POST',
        _data: {
          channel: 'APP',
          phoneNumber: phone,
          verificationCode: code,
          newPassword: password,
          retryNewPassword: rPassword,
        },
      });
      setLoading(false);
      if (response.status === 200) {
        navigate('ChangePasswordSuccess');
      }
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError('Qualcosa è accaduto. Riprova');
      resetError();
      // Alert.alert('Errore', 'Qualcosa è accaduto. Riprova');
    }
  };
  // validate live pass and confirm pass
  useEffect(()=>{
    trigger('rPassword');
  },[pwd]);

  return (
    <>
      <Pressable onPress={() => Keyboard.dismiss()} style={container}>
        <Spacer />

        <Text style={style.title}>{'Procedura di\nreset password'}</Text>
        {error !== '' && (
          <Text style={{ color: 'orange', textAlign: 'center' }}>{error}</Text>
        )}
        <View style={style.formWrapper}>
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
            onPasswordMessagePressed={() => navigate('PasswordError')}
            blurOnSubmit={false}
          />
          <Spacer height={16} />
          <FormInput
            name="rPassword"
            placeholder="Conferma Password*"
            autoCapitalize="none"
            autoCorrect={false}
            control={control}
            // errorMessage={error}
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
        <WhiskeredButton
          accessibilityLabel="conferma"
          title="conferma"
          type="tertiary"
          loading={loading}
          disabled={!isDirty || !isValid}
          onPress={handleSubmit(onResetEnterNewPasswordPressed)}
        />
        <Text style={style.loginWrapper}>
          <Text style={style.goback}>Torna alla </Text>
          <Text
            style={style.loginLink}
            suppressHighlighting
            onPress={() => navigate('Login')}>
            Login
          </Text>
        </Text>
      </LoginFooter>
    </>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    formWrapper: {
      flexGrow: 1,
      paddingHorizontal: 80,
      justifyContent: 'center',
    },
    title: {
      fontFamily: theme.fonts.bold,
      fontSize: 22,
      color: theme.colors.black,
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
      color: theme.colors.text,
    },
    loginLink: {
      fontFamily: theme.fonts.bold,
      fontSize: 16,
      color: theme.colors.text,
    },
  });
