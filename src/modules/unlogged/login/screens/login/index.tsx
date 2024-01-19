import { FC, useState } from 'react';
import {
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
import { useDisableGoBack } from '@core/hooks';
import { FormInput } from '@components/FormInput';
import { LoginFooter } from '@components/LoginFooter';
import { Spacer } from '@components/Spacer';
import { WhiskeredButton } from '@components/WhiskeredButton';
import {
  Colors,
  generalColorsNew,
  ThemeContext,
  useTheme,
  useThemedStyles,
} from '@core/theme';
import { useLoginContainer } from '@modules/unlogged/hooks';
import { UnloggedStackParamList } from '@modules/unlogged';
import { PASSWORD_REGEX } from '@core/constants';
import {
  formatPhoneNumber,
  validatePhoneNumber,
} from '@modules/unlogged/helpers';
import { useLoginMutation } from '@core/redux/Api/endpoints/Auth';
import { Button } from '@components/Button';
import { RootState, store } from '@core/redux/store';
import { AuthSlice } from '@core/redux/authSlice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeCustomer } from '@core/redux/customerSlice';

/**
 * Types
 */

type LoginScreenProps = StackScreenProps<UnloggedStackParamList, 'Login'>;

type LoginData = {
  username: string;
  password: string;
};

/**
 * Constants
 */

const DEFAULT_VALUES: LoginData = {
  username: '',
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
  // const style = useThemedStyles(styles);
  const { container } = useLoginContainer();
  const {
    control,
    handleSubmit,
    reset,
    watch,
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
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onLoginPressed = async ({ username, password }: LoginData) => {
    await login({
      username: username,
      password,
      grant_type: 'password',
    })
      .unwrap()
      .then(async resp => {
        console.log('Login successfully ' + resp);
        await AsyncStorage.setItem('username', watch('username'));
        dispatch(removeCustomer());
      })
      .catch(err => {
        if (err.status === 400) {
          setError({
            isError: true,
            message: 'Username o password errati',
          });
        } else {
          setError({
            isError: true,
            message: 'Qualcosa è accaduto. Riprova',
          });
        }
        resetError();
      });
  };
  const theme = useTheme();
  const style = useThemedStyles(styles);
  const isDarkTheme = useSelector((state: RootState) => state.auth.darkMode);
  const colorScheme = useColorScheme();

  return (
    <KeyboardAwareScrollView contentContainerStyle={style.main}>
      {error.isError && (
        <Text style={{ color: generalColorsNew.orange, textAlign: 'center' }}>
          {error.message}
        </Text>
      )}
      <Spacer height={100} />
      <FormInput
        name="username"
        placeholder="Username"
        control={control}
        autoCapitalize={'none'}
        autoCorrect={false}
        fixed={isLoading}
        rules={{
          required: true,
          //   validate: validatePhoneNumber,
        }}
        //  keyboardType="phone-pad"
        negativeColor={true}
        styless={style.backNegative}
      />
      <Spacer height={16} />
      <FormInput
        name="password"
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        fixed={isLoading}
        control={control}
        rules={{
          required: true,
          pattern: PASSWORD_REGEX,
        }}
        negativeColor={true}
        styless={style.backNegative}
        // onPasswordMessagePressed={() => navigate('PasswordError')}
      />
      <Spacer height={'30%'} />
      <Button
        accessibilityLabel="entra"
        title="ENTRA"
        type="secondary"
        disabled={!isDirty || !isValid}
        loading={isLoading}
        onPress={handleSubmit(onLoginPressed)}
      />
      {/* <Text>{isDarkTheme ? 'DARK' : 'LIGHT'}</Text>
      <Button
        accessibilityLabel="toggle theme"
        title="TOGGLE THEME"
        type="tertiary"
        onPress={() => dispatch(AuthSlice.actions.ToggleTheme())}
      />}
      {/*<LoginFooter>
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
          </LoginFooter>*/}
    </KeyboardAwareScrollView>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.colors.accent,
      paddingHorizontal: 30,
    },
    backNegative: {
      backgroundColor: theme.colors.accent,
      color: theme.colors.textPrimary,
    },
    back: {
      backgroundColor: theme.colors.backgroundNegative,
      color: theme.colors.textPrimary,
    },
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
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    registerWrapper: {
      textAlign: 'center',
      marginBottom: 85,
    },
    notRegistered: {
      fontFamily: theme.fonts.regular,
      fontSize: 16,
      color: theme.colors.textPrimary,
    },
    register: {
      fontFamily: theme.fonts.bold,
      fontSize: 16,
      color: theme.colors.textPrimary,
    },
  });
