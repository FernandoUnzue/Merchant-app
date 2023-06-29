import { FC, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { useDisableGoBack } from '@core/hooks';
import { FormInput } from '@components/FormInput';
import { LoginFooter } from '@components/LoginFooter';
import { Spacer } from '@components/Spacer';
import { WhiskeredButton } from '@components/WhiskeredButton';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { useLoginContainer } from '@modules/unlogged/hooks';
import { UnloggedStackParamList } from '@modules/unlogged';
import { PASSWORD_REGEX } from '@core/constants';
import {
  formatPhoneNumber,
  validatePhoneNumber,
} from '@modules/unlogged/helpers';
import { useLoginMutation } from '@core/redux/Api/endpoints/Auth';

/**
 * Types
 */

type LoginScreenProps = StackScreenProps<UnloggedStackParamList, 'Login'>;

type LoginData = {
  phone: string;
  password: string;
};

/**
 * Constants
 */

const DEFAULT_VALUES: LoginData = {
  phone: '',
  password: '',
};

interface respLogin {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  jti: string;
}

export type XMLresp = {
  _response: respLogin;
  status: number;
  _hasError: boolean;
};

/**
 * Login Screen
 */

export const Login: FC<LoginScreenProps> = ({ navigation: { navigate } }) => {
  useDisableGoBack();
  const style = useThemedStyles(styles);
  const { container } = useLoginContainer();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<LoginData>({ mode: 'onChange', defaultValues: DEFAULT_VALUES });

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

  const [login, { isLoading }] = useLoginMutation();

  const onLoginPressed = async ({ phone, password }: LoginData) => {
    await login({
      username: formatPhoneNumber(phone),
      password,
      grant_type: 'password',
    })
      .unwrap()
      .then(resp => {
        console.log('Login successfully ' + resp);
      })
      .catch(err => {
        if (err.status === 400) {
          setError({
            isError: true,
            message: 'Numero di telefono o password errati',
          });
        } else if (err.status === 428) {
          // if the user not complete the full registration
          navigate('RegisterPersonalData', { phone: formatPhoneNumber(phone) });
        } else {
          setError({
            isError: true,
            message: 'Qualcosa è accaduto. Riprova',
          });
        }
        resetError();
      });
  };

  return (
    <>
      <Pressable onPress={() => Keyboard.dismiss()} style={container}>
        {error.isError && (
          <Text style={{ color: 'orange', textAlign: 'center' }}>
            {error.message}
          </Text>
        )}
        <View style={style.formWrapper}>
          <FormInput
            name="phone"
            placeholder="Numero cellulare"
            control={control}
            rules={{
              required: true,
              validate: validatePhoneNumber,
            }}
            keyboardType="phone-pad"
          />
          <Spacer height={16} />
          <FormInput
            name="password"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            control={control}
            rules={{
              required: true,
              pattern: PASSWORD_REGEX,
            }}
            // onPasswordMessagePressed={() => navigate('PasswordError')}
          />
        </View>
      </Pressable>

      <LoginFooter>
        <WhiskeredButton
          accessibilityLabel="accedi"
          title="accedi"
          type="tertiary"
          disabled={!isDirty || !isValid}
          loading={isLoading}
          onPress={handleSubmit(onLoginPressed)}
        />
        <View style={style.textWrapper}>
          <Text
            style={style.forgotPassword}
            onPress={() => navigate('ResetPassword')}>
            Password dimenticata?
          </Text>
          <Text style={style.registerWrapper}>
            <Text style={style.notRegistered}>Non sei ancora registrato? </Text>
            <Text
              style={style.register}
              suppressHighlighting
              onPress={() => navigate('Register')}>
              Registrati
            </Text>
          </Text>
        </View>
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
    textWrapper: {
      flex: 1,
      justifyContent: 'space-between',
    },
    forgotPassword: {
      marginTop: 10,
      fontFamily: theme.fonts.regular,
      fontSize: 12,
      color: theme.colors.text,
      textAlign: 'center',
    },
    registerWrapper: {
      textAlign: 'center',
      marginBottom: 85,
    },
    notRegistered: {
      fontFamily: theme.fonts.regular,
      fontSize: 16,
      color: theme.colors.text,
    },
    register: {
      fontFamily: theme.fonts.bold,
      fontSize: 16,
      color: theme.colors.text,
    },
  });
