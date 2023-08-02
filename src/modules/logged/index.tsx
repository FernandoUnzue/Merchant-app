import { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './coupon/burn';
import TabNav from '@components/NavBar/NavBar';
import {
  ChangePasswordDraft,
  ChangePasswordSuccess,
} from '@modules/unlogged/login';
import SuccessBurnCouponScreen from './coupon/burn/screens/success';
import { PasswordError } from '@modules/unlogged/password-error';
import ErrorScreenCouponBurn from './coupon/burn/screens/error';
import PreviewScreenCouponBurn from './coupon/burn/screens/preview';
import { Coupon } from '@core/interfaces';

/**
 * Types
 */
type PreviewProps = {
  isValid: boolean;
  isDirty: boolean;
  couponInfo: Coupon;
};

type CouponProp = {
  coupon: Coupon;
};

export type LoggedStackParamList = {
  Home: undefined;
  ChangePasswordDraft: undefined;
  ChangePasswordSuccess: undefined;
  TabNav: undefined;
  SuccessBurnCouponScreen: CouponProp;
  PasswordError: undefined;
  ErrorScreenCouponBurn: CouponProp;
  PreviewScreenCouponBurn: PreviewProps;
};

const Stack = createStackNavigator<LoggedStackParamList>();

/**
 * Navigator
 */
interface Props {
  RootNavigation: any;
}

const LoggedStack: FC<Props> = ({ RootNavigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeftLabelVisible: true,
          header: () => <TabNav navigation={RootNavigation} />,
        }}
      />
      <Stack.Screen
        name="ChangePasswordSuccess"
        component={ChangePasswordSuccess}
        options={{
          headerLeftLabelVisible: true,
          header: () => <TabNav navigation={RootNavigation} />,
        }}
      />
      <Stack.Screen
        name="ChangePasswordDraft"
        component={ChangePasswordDraft}
        options={{
          headerLeftLabelVisible: true,
          header: () => <TabNav navigation={RootNavigation} />,
        }}
      />
      <Stack.Screen
        name="SuccessBurnCouponScreen"
        component={SuccessBurnCouponScreen}
        options={{
          headerLeftLabelVisible: true,
          header: () => <TabNav navigation={RootNavigation} />,
        }}
      />
      <Stack.Screen
        name="ErrorScreenCouponBurn"
        component={ErrorScreenCouponBurn}
        options={{
          headerLeftLabelVisible: true,
          header: () => <TabNav navigation={RootNavigation} />,
        }}
      />
      <Stack.Screen
        name="PreviewScreenCouponBurn"
        component={PreviewScreenCouponBurn}
        options={{
          headerLeftLabelVisible: true,
          header: () => <TabNav navigation={RootNavigation} />,
        }}
      />

      <Stack.Screen
        name="PasswordError"
        component={PasswordError}
        options={{
          headerLeftLabelVisible: true,
          header: () => <TabNav navigation={RootNavigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoggedStack;
