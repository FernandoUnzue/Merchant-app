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
import { Coupon, CouponBuy } from '@core/interfaces';
import CameraScannerScreen from './coupon/burn/screens/cam-scanner';
import DrawerStack from './drawer';
import MemberCardHome from './memberCard';
import HomeMemberCardPrivate from './memberCard/screens/home';

/**
 * Types
 */
type PreviewProps = {
  isValid: boolean;
  isDirty: boolean;
  couponInfo: CouponBuy;
  valueSearch: string;
  functionSubmit: (a: number) => void;
};

type CouponProp = {
  coupon?: CouponBuy;
};

type CamScnannerProps = {
  qrfound: string;
  setQr: (a: string) => void;
};

type HomeBurnCouponProps = {
  qrfound?: string;
};

export type LoggedStackParamList = {
  HomeBurnCoupon: HomeBurnCouponProps;
  ChangePasswordDraft: undefined;
  ChangePasswordSuccess: undefined;
  TabNav: undefined;
  SuccessBurnCouponScreen: CouponProp;
  PasswordError: undefined;
  ErrorScreenCouponBurn: CouponProp;
  PreviewScreenCouponBurn: PreviewProps;
  CameraScannerScreen: undefined;
  MemberDrawerStack: undefined;
};

const Stack = createStackNavigator<LoggedStackParamList>();

/**
 * Navigator
 */
interface Props {
  RootNavigation?: any;
}

// burn coupon stack

export const BurnCouponStack: FC<Props> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="HomeBurnCoupon"
        component={Home}
        initialParams={{
          qrfound: '',
        }}
      />
      <Stack.Screen
        name="SuccessBurnCouponScreen"
        component={SuccessBurnCouponScreen}
      />
      <Stack.Screen
        name="ErrorScreenCouponBurn"
        component={ErrorScreenCouponBurn}
      />
      <Stack.Screen
        name="PreviewScreenCouponBurn"
        component={PreviewScreenCouponBurn}
      />

      <Stack.Screen
        name="CameraScannerScreen"
        component={CameraScannerScreen}
      />

      <Stack.Screen name="PasswordError" component={PasswordError} />
    </Stack.Navigator>
  );
};

// member card stack

type HomeMemberCardProps = {
  qrfound?: string;
};

export type MemberCardStackParamList = {
  MemberCardHome: HomeMemberCardProps;
  MemberCardHomePrivate: undefined;
};

const StackMemberCard = createStackNavigator<MemberCardStackParamList>();

interface MemberCardProps {}
export const MemberCardStack: React.FC<MemberCardProps> = () => {
  return (
    <StackMemberCard.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <StackMemberCard.Screen
        name="MemberCardHome"
        component={MemberCardHome}
        initialParams={{
          qrfound: '',
        }}
      />
      <StackMemberCard.Screen
        name="MemberCardHomePrivate"
        component={HomeMemberCardPrivate}
      />
    </StackMemberCard.Navigator>
  );
};

// info client stack

export type InfoOperatorParamList = {
  ChangePasswordDraft: undefined;
  ChangePasswordSuccess: undefined;
};

const StackInfoOpeator = createStackNavigator<InfoOperatorParamList>();

interface InfoOperatorStackProps {}
export const InfoOperatorStack: React.FC<InfoOperatorStackProps> = () => {
  return (
    <StackInfoOpeator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <StackInfoOpeator.Screen
        name="ChangePasswordDraft"
        component={ChangePasswordDraft}
      />
      <StackInfoOpeator.Screen
        name="ChangePasswordSuccess"
        component={ChangePasswordSuccess}
      />
    </StackInfoOpeator.Navigator>
  );
};
