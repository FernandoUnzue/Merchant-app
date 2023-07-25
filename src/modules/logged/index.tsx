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

/**
 * Types
 */
type IdPropsNumber = {
  id: number;
};

export type LoggedStackParamList = {
  Home: undefined;
  ChangePasswordDraft: undefined;
  ChangePasswordSuccess: undefined;
  TabNav: undefined;
  SuccessBurnCouponScreen: undefined;
  PasswordError: undefined;
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
