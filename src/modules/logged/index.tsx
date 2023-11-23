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
import HomeMemberCardPrivate from './memberCard/screens/spesa';
import HomeSpesa from './memberCard/screens/spesa';
import CameraScannerScreenCard from './memberCard/screens/cam-scanner-card';
import ResumeSaleScreen from './memberCard/screens/spesa/screens/resume';
import PaymentSaleScreen from './memberCard/screens/spesa/screens/payment';
import SuccessSaleScreen from './memberCard/screens/spesa/screens/success';
import InfoClientHomeScreen from './infoClient';
import LastMovementHome from './lastMov';
import DeleteLastMovementHome from './lastMov/delete';
import ConfirmDeleteMovScreen from './lastMov/delete/screens/confirm';
import ErrorDeleteMovScreen from './lastMov/delete/screens/error';
import SuccessDeleteMovScreen from './lastMov/delete/screens/success';

/**
 * Types
 */
type PreviewProps = {
  couponInfo: CouponBuy;
  valueSearch: string;
  functionSubmit: (a: number) => void;
};

type CouponProp = {
  coupon?: CouponBuy;
};

type CouponPropError = {
  coupon?: CouponBuy;
  error?: { status: number; data: string };
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
  ErrorScreenCouponBurn: CouponPropError;
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
        animationEnabled: false,
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
  CameraScannerScreen: undefined;
};

const StackMemberCard = createStackNavigator<MemberCardStackParamList>();

interface MemberCardProps {}
export const MemberCardStack: React.FC<MemberCardProps> = () => {
  return (
    <StackMemberCard.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <StackMemberCard.Screen
        name="MemberCardHome"
        component={MemberCardHome}
        initialParams={{
          qrfound: '',
        }}
      />
      <StackMemberCard.Screen
        name="CameraScannerScreen"
        component={CameraScannerScreenCard}
      />
    </StackMemberCard.Navigator>
  );
};

// spesa stack

type ResumeProps = {
  amount: number;
};

type PaymentProps = {
  amount: number;
  spesa: number;
  voucherId: number;
  discount: number;
};

type SuccessProps = {
  customerId: number;
  card: string;
  campaignId: number;
  campaignName: string;
  movementId: number;
  chargedPoints: number;
  shopName: string;
  discount: number;
  dataTime: string;
  localTime: string;
  amount: number;
  discountAmount: number;
  spesa: number;
};

export type SpesaStackParamList = {
  HomeSpesa: undefined;
  ResumeSaleScreen: ResumeProps;
  PaymentSaleScreen: PaymentProps;
  SuccessSaleScreen: SuccessProps;
};

const SpesaStack = createStackNavigator<SpesaStackParamList>();

interface SpesaProps {}
export const SpesaFlowStack: React.FC<SpesaProps> = () => {
  return (
    <SpesaStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <SpesaStack.Screen name="HomeSpesa" component={HomeSpesa} />
      <SpesaStack.Screen name="ResumeSaleScreen" component={ResumeSaleScreen} />
      <SpesaStack.Screen
        name="PaymentSaleScreen"
        component={PaymentSaleScreen}
      />
      <SpesaStack.Screen
        name="SuccessSaleScreen"
        component={SuccessSaleScreen}
      />
    </SpesaStack.Navigator>
  );
};

// info operator stack

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
        animationEnabled: false,
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

// info client stack

export type InfoClientParamList = {
  HomeScreen: undefined;
};

const StackInfoCliente = createStackNavigator<InfoClientParamList>();

interface InfoClienteStackProps {}
export const InfoClientStack: React.FC<InfoClienteStackProps> = () => {
  return (
    <StackInfoCliente.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <StackInfoCliente.Screen
        name="HomeScreen"
        component={InfoClientHomeScreen}
      />
    </StackInfoCliente.Navigator>
  );
};

// ultimo movimiento

export type UltimoMovParamList = {
  HomeScreen: undefined;
};

const StackUltimoMov = createStackNavigator<UltimoMovParamList>();

interface UltimoMovStackProps {}
export const UltimoMovStack: React.FC<UltimoMovStackProps> = () => {
  return (
    <StackUltimoMov.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <StackUltimoMov.Screen name="HomeScreen" component={LastMovementHome} />
    </StackUltimoMov.Navigator>
  );
};

// elimina ultimo movimiento

type DeleteErrorProps = {
  errorMessage: string;
};

export type DeleteUltimoMovParamList = {
  DeleteScreen: undefined;
  DeleteConfirmScreen: undefined;
  DeleteMovError: DeleteErrorProps;
  DeleteMovSuccess: undefined;
};

const StackDeleteUltimoMov = createStackNavigator<DeleteUltimoMovParamList>();

interface DeleteUltimoMovStackProps {}
export const DeleteUltimoMovStack: React.FC<DeleteUltimoMovStackProps> = () => {
  return (
    <StackDeleteUltimoMov.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <StackDeleteUltimoMov.Screen
        name="DeleteScreen"
        component={DeleteLastMovementHome}
      />
      <StackDeleteUltimoMov.Screen
        name="DeleteConfirmScreen"
        component={ConfirmDeleteMovScreen}
      />
      <StackDeleteUltimoMov.Screen
        name="DeleteMovError"
        component={ErrorDeleteMovScreen}
      />
      <StackDeleteUltimoMov.Screen
        name="DeleteMovSuccess"
        component={SuccessDeleteMovScreen}
      />
    </StackDeleteUltimoMov.Navigator>
  );
};
