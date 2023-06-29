import { FC, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isValidPhoneNumber } from 'libphonenumber-js';

import { useDisableGoBack } from '@core/hooks';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { useLoginContainer } from '@modules/unlogged/hooks';
import { FormInput } from '@components/FormInput';
import { LoginFooter } from '@components/LoginFooter';
import { Spacer } from '@components/Spacer';
import { WhiskeredButton } from '@components/WhiskeredButton';
import { Checkbox } from '@components/Checkbox';
import { isSmallDevice } from '@core/helpers';
import { UnloggedStackParamList } from '@modules/unlogged';
import { formatPhoneNumber } from '@modules/unlogged/helpers';
import { ALPHANUMERIC_REGEX, PASSWORD_REGEX } from '@core/constants';
import { Api, fetchApi } from '@core/clients/axioss';
import { BASIC_AUTH_PASSWORD, BASIC_AUTH_USERNAME } from 'react-native-dotenv';
import { useRegisterContainer } from '@modules/unlogged/hooks/use-login-container/registerFooter';
import { ShowIf } from '@components/ShowIf';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NUMBERS_REGEX } from '@core/helpers/utils';

/**
 * Types
 */

type RegisterScreenProps = StackScreenProps<UnloggedStackParamList, 'Register'>;

export type RegisterData = {
  phone: string;
  password: string;
  rPassword: string;
  codiceAmico?: string;
  tycAccepted: boolean;
};

/**
 * Constants
 */

const FORM_SPACING = 16;

const DEFAULT_VALUES: RegisterData = {
  phone: '',
  password: '',
  rPassword: '',
  codiceAmico: '',
  tycAccepted: false,
};

/**
 * Register Screen
 */
export const password =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&.+=])\S{8,32}$/;
export const userSchema = yup.object().shape({
  phone: yup.string().min(10, ' ').required(' '),
  password: yup.string().matches(password).required(),
  rPassword: yup.string().oneOf([yup.ref('password')]),
  codiceAmico: yup.string(),
  tycAccepted: yup.bool().isTrue().required(),
});
export const Register: FC<RegisterScreenProps> = ({
  navigation: { navigate },
}) => {
  useDisableGoBack();

  const style = useThemedStyles(styles);
  const { container } = useRegisterContainer();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm<RegisterData>({
    mode: 'all',
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(userSchema),
  });
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
  const pwd = watch('password');
  const [errorStatus, setErrorStatus] = useState<number>();
  const validatePhoneNumber = (phone: string) =>
    isValidPhoneNumber(formatPhoneNumber(phone));

  const isChecked = (value: boolean) => !!value;

  useEffect(() => {
    trigger('rPassword');
  }, [pwd]);

  const onRegisterPressed = async ({ phone, password }: RegisterData) => {
    setLoading(true);
    // TODO: add field for terms and conditions checked and actual category id

    try {
      const response = await Api({
        endpoint: '/api/register',
        method: 'POST',
        auth: true,
        _data: {
          phoneNumber: formatPhoneNumber(phone),
          password,
        },
      });
      setLoading(false);
      if (response.status === 201) {
        navigate('OTPValidation', { phone, change: true });
        reset();
      }
      {
        /* else {
        Alert.alert('Errore', 'Qualcosa è accaduto. Riprova');
        console.log(response.data.errorMessage);
      }*/
      }
    } catch (e: any) {
      setLoading(false);
      console.log(e);
      setErrorStatus(e.response.status);
      setError({
        isError: true,
        message: 'Numero di telefono invalido',
      });
      resetError();
      // Alert.alert('Errore', 'Qualcosa è accaduto. Riprova');
    }
  };

  console.log(JSON.stringify(errors));
  console.log(isValid);
  return (
    <>
      <View style={container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          bounces={false}
          viewIsInsideTabBar
          contentContainerStyle={{
            ...style.formWrapper,
            paddingHorizontal: isSmallDevice() ? '10%' : '15%',
          }}>
          {/*<ShowIf condition={error.isError}>
            <Text style={style.errorMessage}>{error.message}</Text>
  </ShowIf>*/}
          <FormInput
            name="phone"
            placeholder="Inserisci nuovo numero di cellulare*"
            control={control}
            rules={{
              required: true,
              validate: validatePhoneNumber,
            }}
            keyboardType="phone-pad"
            errorMessage={
              errorStatus === 409 ? 'Numero di telefono registrato' : ''
            }
          />
          <Spacer height={FORM_SPACING} />
          <FormInput
            name="password"
            placeholder="Scegli Password*"
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
          <Spacer height={FORM_SPACING} />
          <FormInput
            name="rPassword"
            placeholder="Conferma Password*"
            autoCapitalize="none"
            confirmPass={true}
            passValue={watch('password')}
            autoCorrect={false}
            //disablePaste
            control={control}
            rules={{
              required: true,
            }}
            blurOnSubmit={false}
          />
          <Spacer height={FORM_SPACING} />
          <FormInput
            name="codiceAmico"
            placeholder="Codice Amico"
            autoCapitalize="none"
            autoCorrect={false}
            control={control}
            rules={{
              minLength: 3,
              maxLength: 20,
              pattern: ALPHANUMERIC_REGEX,
            }}
          />
          <Spacer height={FORM_SPACING} />
          <View style={style.tycWrapper}>
            <View style={style.checkboxWrapper}>
              <Checkbox
                name="tycAccepted"
                control={control}
                rules={{
                  required: true,
                  validate: isChecked,
                }}
              />
            </View>
            <Text style={style.tycTextWrapper}>
              <Text style={style.tycText}>
                *Ho letto, compreso ed accetto i{' '}
              </Text>
              <Text
                style={style.tycLinkedText}
                suppressHighlighting
                onPress={() => navigate('TermsAndConditions')}>
                termini e le condizioni di utilizzo
              </Text>
            </Text>
          </View>
          <Spacer height={FORM_SPACING} />
        </KeyboardAwareScrollView>
      </View>

      <LoginFooter containerStyle={style.footerStyle}>
        <WhiskeredButton
          accessibilityLabel="conferma"
          title="conferma"
          type="secondary"
          loading={loading}
          disabled={!isDirty || !isValid}
          onPress={handleSubmit(onRegisterPressed)}
        />
        {/*  <ShowIf condition={error.isError}>
          <Text style={style.errorMessage}>{error.message}</Text>
              </ShowIf>*/}
        <View style={style.textWrapper}>
          <Text style={style.forgotPassword}>*Campi obbligatori</Text>
          <Text style={style.registerWrapper}>
            <Text style={style.notRegistered}>Sei già registrato? </Text>
            <Text
              style={style.register}
              suppressHighlighting
              onPress={() => navigate('Login')}>
              Accedi
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
      paddingHorizontal: '20%',
      justifyContent: 'center',
    },
    tycWrapper: {
      flexDirection: 'row',
    },
    checkboxWrapper: {
      marginTop: 3,
    },
    tycTextWrapper: {
      marginLeft: 5,
    },
    tycText: {
      fontFamily: theme.fonts.regular,
      fontSize: 14,
      color: theme.colors.text,
    },
    tycLinkedText: {
      fontFamily: theme.fonts.bold,
      fontSize: 14,
      color: theme.colors.accent,
    },
    errorMessage: {
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      color: theme.colors.textTertiary,
      alignSelf: 'stretch',
      textAlign: 'center',
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
      marginBottom: '10%',
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
