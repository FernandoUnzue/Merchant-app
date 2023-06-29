import { FC, useCallback, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { useCountdownTimer } from '@core/hooks';
import { useLoginContainer } from '@modules/unlogged/hooks';
import { UnloggedStackParamList } from '@modules/unlogged';
import { LoginFooter } from '@components/LoginFooter';
import { WhiskeredButton } from '@components/WhiskeredButton';
import { Spacer } from '@components/Spacer';
import { Button } from '@components/Button';
import axiosInstance from '@core/clients/axios';
import { Api } from '@core/clients/axioss';
import { ShowIf } from '@components/ShowIf';

/**
 * Types
 */

type EmailValidationScreenProps = StackScreenProps<
  UnloggedStackParamList,
  'EmailValidation'
>;

/**
 * Constants
 */

const RESEND_EMAIL_TIMER = 60;

/**
 * EmailValidation Screen
 */

export const EmailValidation: FC<EmailValidationScreenProps> = ({
  route: {
    params: { phone, cardNumber, email },
  },
  navigation: { navigate, goBack },
}) => {
  const style = useThemedStyles(styles);
  const { container } = useLoginContainer();
  const { timer, onTime, resetTimer } = useCountdownTimer(RESEND_EMAIL_TIMER);
  const [emailValidated, setEmailValidated] = useState(false);
  const polling = useRef(setTimeout(() => checkEmailValidation(), 5000));

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

  const checkEmailValidation = useCallback(async (): Promise<void> => {
    try {
      const response = await Api({
        endpoint: `/api/verify-email/${phone}`,
      });
      if (response.status === 200) {
        if (response.data) {
          setEmailValidated(true);
          clearTimeout(polling.current);
        }
      }
    } catch (e) {
      // Alert.alert('Errore', 'Qualcosa è accaduto. Riprova');
      setError({
        isError: true,
        message: 'Qualcosa è accaduto. Riprova',
      });
      resetError();
      clearTimeout(polling.current);
    }
  }, [clearTimeout, setError, setEmailValidated, error, emailValidated]);

  const resendValidationEmail = async () => {
    resetTimer();

    try {
      const response = await Api({
        endpoint: `/api/verification-email-send/${phone}`,
      });

      if (response.status === 200) {
        // Alert.alert('Check your email', 'Validation email was resent');
        setError({
          isError: false,
          message:
            "L'e-mail di convalida è stata reinviata. Controlla la tua e-mail",
        });
        resetError();
      }
    } catch (err) {
      setError({
        isError: true,
        message: 'Error when email is sent',
      });
      resetError();
    }
  };

  return (
    <>
      <View style={[container, style.body]}>
        <View style={style.content}>
          <Spacer />
          <Text style={style.title}>
            {'Controlla la casella di posta\ne verifica la tua email'}
          </Text>
          {error.isError && (
            <Text style={style.errorMessage}>{error.message}</Text>
          )}

          {!error.isError && error.message !== '' && (
            <Text style={style.errorMessage}>{error.message}</Text>
          )}

          <Spacer height={14} />
          <Text style={style.subtitle}>
            {'Abbiamo inviato un link di verifica all’indirizzo:'}
          </Text>
          <Text style={style.email}>{email}</Text>
          <Spacer height={14} />
          {/*<Text style={style.changeEmail} onPress={goBack}>
            <Text style={style.wrong}>Email errata? </Text>
            <Text style={style.insert}>Inserisci nuova email</Text>
  </Text>*/}

          {/*timer !== '00' && <Text>{timer}</Text>*/}
        </View>
        <Spacer />
      </View>
      <LoginFooter containerStyle={style.footer}>
        <View>
          <WhiskeredButton
            accessibilityLabel="invia di nuovo"
            title={
              timer !== '00' ? `invia di nuovo (${timer})` : 'invia di nuovo'
            }
            type="tertiary"
            timer={emailValidated ? undefined : timer}
            disabled={emailValidated || onTime}
            onPress={resendValidationEmail}
          />
          <Spacer height={14} />
          <View style={style.buttonWrapper}>
            <Button
              accessibilityLabel="procedi"
              title="procedi"
              type="secondary"
              disabled={!emailValidated}
              onPress={() => navigate('EmailValidationSuccess', { cardNumber })}
            />
          </View>
        </View>
        <Text
          style={style.loginWrapper}
          suppressHighlighting
          onPress={() => navigate('Login')}>
          <Text style={style.goback}>Torna alla </Text>
          <Text style={style.loginLink}>Login</Text>
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
    body: {
      justifyContent: 'flex-end',
    },
    content: {
      alignItems: 'center',
    },
    title: {
      fontFamily: theme.fonts.bold,
      fontSize: 22,
      color: theme.colors.black,
      textAlign: 'center',
    },
    subtitle: {
      fontFamily: theme.fonts.regular,
      fontSize: 14,
      color: theme.colors.black,
      textAlign: 'center',
    },
    email: {
      fontFamily: theme.fonts.bold,
      fontSize: 14,
      color: theme.colors.accent,
      textAlign: 'center',
    },
    wrong: {
      fontFamily: theme.fonts.regular,
      fontSize: 12,
      color: theme.colors.text,
      textAlign: 'center',
    },
    insert: {
      fontFamily: theme.fonts.bold,
      fontSize: 12,
      color: theme.colors.text,
      textAlign: 'center',
    },
    footer: {
      justifyContent: 'space-between',
    },
    buttonWrapper: {
      paddingHorizontal: 60,
    },
    goback: {
      fontFamily: theme.fonts.regular,
      fontSize: 16,
      color: theme.colors.text,
    },
    loginWrapper: {
      textAlign: 'center',
      marginBottom: 85,
    },
    loginLink: {
      fontFamily: theme.fonts.bold,
      fontSize: 16,
      color: theme.colors.text,
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
