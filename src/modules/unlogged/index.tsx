import { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Presentation } from '@modules/unlogged/presentation';
import {
  ResetEnterNewPassword,
  ChangePasswordDraft,
  ChangePasswordSuccess,
  Login,
  ResetPassword,
} from '@modules/unlogged/login';
import {
  Register,
  RegisterPersonalData,
  TermsAndConditions,
  MemberCard,
  EmailValidation,
  EmailValidationSuccess,
} from '@modules/unlogged/register';
import { ChangePhoneNumber, OTPValidation } from '@modules/unlogged/otp';
import { PasswordError } from '@modules/unlogged/password-error';
import { LoginHeader } from '@components/LoginHeader';
import { Home } from './login/screens/home';
import { decode, encode } from 'base-64';
import { ChangePasswordSuccessUnlogged } from './login/screens/change-password-success/unlogged';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

/**
 * Types
 */

type OTPValidationParams = {
  phone: string;
};

type OTPValidationParams1 = {
  phone: string;
  change: boolean;
};

type MemberCardParams = {
  cardNumber: string;
};

type EmailValidationParams = {
  phone: string;
  cardNumber: string;
  email: string;
};

type ResetEnterNewPasswordParams = {
  phone: string;
  code: string;
};

export type UnloggedStackParamList = {
  Presentation: undefined;
  Login: undefined;
  Home: undefined;
  ResetEnterNewPassword: ResetEnterNewPasswordParams;
  ChangePasswordDraft: undefined;
  ChangePasswordSuccess: undefined;
  ResetPassword: undefined;
  Register: undefined;
  RegisterPersonalData: OTPValidationParams;
  PasswordError: undefined;
  TermsAndConditions: undefined;
  OTPValidation: OTPValidationParams1;
  ChangePhoneNumber: OTPValidationParams;
  EmailValidation: EmailValidationParams;
  MemberCard: MemberCardParams;
  EmailValidationSuccess: MemberCardParams;
};

const Stack = createStackNavigator<UnloggedStackParamList>();

/**
 * Navigator
 */

interface Props {
  RootNavigation: any;
}

export const UnloggedStack: React.FC<Props> = ({ RootNavigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        gestureEnabled: false,
        header: () => <LoginHeader />,
      }}
      initialRouteName="Presentation">
      <Stack.Screen name="Presentation" component={Presentation} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen
        name="ResetEnterNewPassword"
        component={ResetEnterNewPassword}
      />
      <Stack.Screen
        name="ChangePasswordSuccess"
        component={ChangePasswordSuccessUnlogged}
      />
      <Stack.Screen name="PasswordError" component={PasswordError} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="RegisterPersonalData"
        component={RegisterPersonalData}
      />
      <Stack.Screen name="MemberCard" component={MemberCard} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="OTPValidation" component={OTPValidation} />
      <Stack.Screen name="ChangePhoneNumber" component={ChangePhoneNumber} />
      <Stack.Screen name="EmailValidation" component={EmailValidation} />
      <Stack.Screen
        name="EmailValidationSuccess"
        component={EmailValidationSuccess}
      />
    </Stack.Navigator>
  );
};
