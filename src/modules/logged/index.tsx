import { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home';
import TabNav from '@components/NavBar/NavBar';

/**
 * Types
 */
type IdPropsNumber = {
  id: number;
};

export type LoggedStackParamList = {
  Home: undefined;
  ChangePasswordSuccess: undefined;
  TabNav: undefined;
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
    </Stack.Navigator>
  );
};

export default LoggedStack;
