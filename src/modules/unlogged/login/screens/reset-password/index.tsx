import { FC, useState } from 'react';
import {
  Keyboard,
  Platform,
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
import { WhiskeredButton } from '@components/WhiskeredButton';
import { errorHandler } from '@core/helpers';
import {
  formatPhoneNumber,
  resetPasswordErrorMapper,
  validatePhoneNumber,
} from '@modules/unlogged/helpers';
import axiosInstance from '@core/clients/axios';
import { Api } from '@core/clients/axioss';

/**
 * Types
 */

type ResetPasswordScreenProps = StackScreenProps<
  UnloggedStackParamList,
  'ResetPassword'
>;

type ResetPasswordData = {
  phone: string;
};

/**
 * Constants
 */

const DEFAULT_VALUES: ResetPasswordData = {
  phone: '',
};

/**
 * ResetPassword Screen
 */

export const ResetPassword: FC<ResetPasswordScreenProps> = ({
  navigation: { navigate },
}) => {
  useDisableGoBack();
  const style = useThemedStyles(styles);
  const { container } = useLoginContainer();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [smsSent, setSmsSent] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty, isValid },
  } = useForm<ResetPasswordData>({
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });

  const onResendResetPasswordPressed = async (data: ResetPasswordData) => {
    setSmsSent(false);
    onResetPasswordPressed(data);
  };

  const onResetPasswordPressed = async ({ phone }: ResetPasswordData) => {
    setLoading(true);
    error && setError('');

    try {
      const response = await Api({
        endpoint: '/api/user/reset-password',
        method: 'POST',
        _data: {
          channel: Platform.OS === 'android' ? 'APP-Android' : 'APP',
          username: formatPhoneNumber(phone),
        },
      });
      setLoading(false);

      if (response.status === 200) {
        setSmsSent(true);
      } else {
        setError(errorHandler(resetPasswordErrorMapper, response));
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError(errorHandler(resetPasswordErrorMapper, e));
    }
  };

  return (
    <>
      <Pressable onPress={() => Keyboard.dismiss()} style={container}>
        <View style={style.formWrapper}>
          <FormInput
            name="phone"
            placeholder="Inserisci il numero di telefono registrato"
            control={control}
            rules={{
              required: true,
              validate: validatePhoneNumber,
            }}
            okMessage={smsSent ? 'Ti invieremo un sms a breve!' : undefined}
            onChange={() => error && setError('')}
            errorMessage={error}
            keyboardType="phone-pad"
            // multiline
          />
        </View>
        {/* <Pressable
          onPress={() =>
            navigate('ResetEnterNewPassword', {
              phone: watch('phone'),
              code: 'FDFDFDSFSDFSDFSDFSDF',
            })
          }>
          <Text>NEXT PAGE</Text>
        </Pressable>*/}
      </Pressable>

      <LoginFooter containerStyle={style.loginFooter}>
        <WhiskeredButton
          accessibilityLabel="conferma"
          title="conferma"
          type="tertiary"
          loading={loading}
          disabled={!isDirty || !isValid || smsSent}
          onPress={handleSubmit(onResetPasswordPressed)}
        />
        <View style={style.loginWrapper}>
          <Text
            style={style.resend}
            suppressHighlighting
            onPress={handleSubmit(onResendResetPasswordPressed)}>
            Invia di nuovo
          </Text>
          <Text>
            <Text style={style.goback}>Torna alla </Text>
            <Text
              style={style.loginLink}
              suppressHighlighting
              onPress={() => navigate('Login')}>
              Login
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
      flex: 1,
      marginTop: 15,
      marginBottom: 85,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    resend: {
      fontFamily: theme.fonts.bold,
      fontSize: 12,
      color: theme.colors.text,
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
