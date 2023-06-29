import { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home';

/**
 * Types
 */
type IdPropsNumber = {
  id: number;
};

export type LoggedStackParamList = {
  Home: undefined;
  ChangePasswordSuccess: undefined;
};

const Stack = createStackNavigator<LoggedStackParamList>();

/**
 * Navigator
 */

export const HomeStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          headerLeftLabelVisible: true,
        }}
      />
    </Stack.Navigator>
  );
};
