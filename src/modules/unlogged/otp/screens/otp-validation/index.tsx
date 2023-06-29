import { FC, useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';

import { useDisableGoBack } from '@core/hooks';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { useLoginContainer } from '@modules/unlogged/hooks';
import { UnloggedStackParamList } from '@modules/unlogged';
import { LoginFooter } from '@components/LoginFooter';
import { WhiskeredButton } from '@components/WhiskeredButton';
import { OTPInput } from '../../components/OTPInput';
import { Spacer } from '@components/Spacer';
import { ShowIf } from '@components/ShowIf';
import { formatPhoneNumber } from '@modules/unlogged/helpers';
import axiosInstance from '@core/clients/axios';
import { Api } from '@core/clients/axioss';

/**
 * Types
 */

type OTPValidationScreenProps = StackScreenProps<
  UnloggedStackParamList,
  'OTPValidation'
>;

export type ValidationValues = {
  code: string;
};

/**
 * OTPValidation Screen
 */

export const OTPValidation: FC<OTPValidationScreenProps> = ({
  navigation: { navigate },
  route: {
    params: { phone, change },
  },
}) => {
  useDisableGoBack();
  const {
    control,
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    setValue,
  } = useForm<ValidationValues>({
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  });

  const style = useThemedStyles(styles);
  const { container } = useLoginContainer();
  const [loading, setLoading] = useState(false);
  const phoneNumber = formatPhoneNumber(phone);

  const resetOTP = useCallback(async () => {
    try {
      const resp = await Api({
        endpoint: `/api/otp/resend/${phoneNumber}`,
        method: 'POST',
      });
      if (resp.status === 200) {
        setError({
          isError: false,
          message: 'OTP inviato',
        });
        resetError();
      }
    } catch (errorr) {
      setError({
        isError: true,
        message: 'Qualcosa è accaduto. Riprova',
      });
      resetError();
      // Alert.alert('Errore', 'Qualcosa è accaduto. Riprova');
    }
  }, [phoneNumber]);

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

  const onSubmit = async ({ code }: ValidationValues) => {
    setLoading(true);

    try {
      const response = await Api({
        endpoint: `/api/verify/otp/${phone}/${code}`,
      });
      setLoading(false);
      // response.data = true (if validated)
      console.log(response);

      if (response.status === 200) {
        navigate('RegisterPersonalData', { phone: phoneNumber });
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      setError({
        isError: true,
        message: 'Qualcosa è accaduto. Riprova',
      });
      resetError();
      // Alert.alert('Errore', 'Qualcosa è accaduto. Riprova');
    }
  };
  useEffect(() => {
    if (change) {
      resetOTP();
    }
  }, [phone]);

  return (
    <>
      <View style={[style.container, container]}>
        <Text style={style.title}>Inserisci il codice ricevuto via sms</Text>
        <Spacer height={'4%'} />
        <Text style={style.caption}>Il codice è stato inviato a:</Text>
        <Text style={style.phone}>{phoneNumber}</Text>
        <Spacer height={'4%'} />
        {/*  <Pressable
        //  style={style.link}
       //  suppressHighlighting
          onPress={() => navigate('ChangePhoneNumber', { phone: phoneNumber })}>
          <Text
            style={style.link}
            suppressHighlighting
          >Cambia numero</Text>
  </Pressable>*/}
        <Spacer height={'12%'} />
        <OTPInput
          control={control}
          name="code"
          register={register}
          setValue={setValue}
        />
        <View style={style.errorWrapper}>
          <ShowIf condition={error.isError}>
            <Text style={style.errorMessage}>Il codice inserito è errato</Text>
          </ShowIf>
          <ShowIf condition={!error.isError && error.message !== ''}>
            <Text style={style.errorMessage}>{error.message}</Text>
          </ShowIf>
        </View>
        <Spacer height={'12%'} />
        <Text style={style.link} onPress={resetOTP}>
          Invia di nuovo
        </Text>
      </View>
      <LoginFooter>
        <WhiskeredButton
          accessibilityLabel="conferma"
          title="conferma"
          type="secondary"
          loading={loading}
          disabled={!isDirty || !isValid}
          onPress={handleSubmit(onSubmit)}
        />
      </LoginFooter>
    </>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    title: {
      fontFamily: theme.fonts.bold,
      fontSize: 18,
      color: theme.colors.text,
      textAlign: 'center',
    },
    caption: {
      fontFamily: theme.fonts.regular,
      fontSize: 10,
      color: theme.colors.text,
      textAlign: 'center',
    },
    phone: {
      fontFamily: theme.fonts.bold,
      fontSize: 14,
      color: theme.colors.text,
      textAlign: 'center',
    },
    link: {
      fontFamily: theme.fonts.regular,
      fontSize: 12,
      color: theme.colors.text,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
    errorWrapper: {
      marginTop: 5,
      height: 20,
    },
    errorMessage: {
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      color: theme.colors.textTertiary,
      alignSelf: 'stretch',
      textAlign: 'center',
    },
    successMessage: {
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      color: theme.colors.textQuaternary,
      alignSelf: 'stretch',
      textAlign: 'center',
    },
  });
