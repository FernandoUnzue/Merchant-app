import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { useDisableGoBack } from '@core/hooks';
import { useLoginContainer } from '@modules/unlogged/hooks';
import { UnloggedStackParamList } from '@modules/unlogged';
import { LoginFooter } from '@components/LoginFooter';
import { WhiskeredButton } from '@components/WhiskeredButton';
import { Spacer } from '@components/Spacer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@core/redux/store';
import { LogOutAsync } from '@core/redux/authSlice/authSlice';
import { LoggedStackParamList } from '@modules/logged';
import OkIcon from '@core/theme/SVGS/OkIcon';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';

/**
 * Types
 */

type ChangePasswordSuccessScreenProps = StackScreenProps<
  LoggedStackParamList,
  'ChangePasswordSuccess'
>;

/**
 * ChangePasswordSuccess Screen
 */

export const ChangePasswordSuccess: FC<ChangePasswordSuccessScreenProps> = ({
  navigation: { navigate, goBack, push },
}) => {
  useDisableGoBack();
  const style = useThemedStyles(styles);
  const { container } = useLoginContainer();
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigation();
  return (
    <>
      <View style={[container, style.body]}>
        <View style={style.content}>
          <OkIcon size={120} />
          <Spacer />
          <Text style={style.title}>{'La tua password\nè aggiornata!'}</Text>
        </View>
      </View>
      <LoginFooter containerStyle={style.loginFooter}>
        <View style={{ paddingHorizontal: 50 }}>
          <Button
            accessibilityLabel="accedi"
            title="accedi"
            type="primary"
            onPress={() =>
              nav.navigate(
                'BurnCoupon' as never,
                { qrfound: undefined } as never,
              )
            }
          />
        </View>

        {/*<Text style={style.loginWrapper}>
          <Text style={style.goback}>Torna alla </Text>
          <Text
            style={style.loginLink}
            suppressHighlighting
            onPress={() => navigate('Login')}>
            Login
          </Text>
  </Text>*/}
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
      justifyContent: 'center',
    },
    content: {
      alignItems: 'center',
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
