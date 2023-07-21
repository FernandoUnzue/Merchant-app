import { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { TabBarComponent, TabBarIcon, TabBarLabel } from '@core/layouts';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import TabNav from '@components/NavBar/NavBar';
import HomeIcon from '@core/theme/SVGS/TabNav/Home';
import ShopIcon from '@core/theme/SVGS/TabNav/Shop';
import PercentIcon from '@core/theme/SVGS/TabNav/Percent';
import GiftIcon from '@core/theme/SVGS/TabNav/Gift';
import SupportIcon from '@core/theme/SVGS/TabNav/Support';
import { Colors } from '@core/theme';
import NotFoundView from '@modules/logged/not found';
import LoggedStack from '../logged';

export type BottomTabParamList = {
  Home: undefined;
  Shop: undefined;
  Percent: undefined;
  Gift: undefined;
  Support: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();
interface Props {
  RootNavigation: any;
}
export const BottomTabNavigator: React.FC<Props> = ({ RootNavigation }) => {
  // export const DashboardTab: FunctionComponent = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#3A3A3A',
          paddingTop: Platform.OS === 'ios' ? 25 : 0,
          height: 50,
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: '#fff',
      }}>
      <Tab.Screen
        name="Home"
        component={LoggedStack}
        options={{
          // unmountOnBlur: true,
          // tabBarIcon: ({ focused }) => (
          //   <TabBarIcon routeName="Home" focused={focused} />
          // ),
          header: () => <TabNav navigation={RootNavigation} />,
          tabBarIcon: resp => (
            <HomeIcon size={36} color={resp.focused ? Colors.accent : '#fff'} />
          ),
        }}
      />

      <Tab.Screen
        name="Shop"
        component={LoggedStack}
        options={{
          // unmountOnBlur: true,
          // tabBarLabel: 'Profile',
          header: () => <TabNav navigation={RootNavigation} />,
          tabBarIcon: resp => (
            <ShopIcon size={36} color={resp.focused ? Colors.accent : '#fff'} />
          ),
        }}
      />
      <Tab.Screen
        name="Percent"
        // component={NotFoundView}
        options={{
          // unmountOnBlur: true,
          // tabBarLabel: 'Profile',
          header: () => <TabNav navigation={RootNavigation} />,
          tabBarIcon: resp => (
            <PercentIcon
              size={36}
              color={resp.focused ? Colors.accent : '#fff'}
            />
          ),
        }}>
        {() => <NotFoundView navigation={RootNavigation} />}
      </Tab.Screen>
      <Tab.Screen
        component={LoggedStack}
        name="Gift"
        // component={NotFoundView}
        options={{
          // unmountOnBlur: true,
          // tabBarLabel: 'Profile',
          header: () => <TabNav navigation={RootNavigation} />,
          tabBarIcon: resp => (
            <GiftIcon size={36} color={resp.focused ? Colors.accent : '#fff'} />
          ),
        }}
      />

      <Tab.Screen
        name="Support"
        options={{
          // unmountOnBlur: true,
          // tabBarLabel: 'Profile',
          header: () => <TabNav navigation={RootNavigation} />,
          tabBarIcon: resp => (
            <SupportIcon
              size={36}
              color={resp.focused ? Colors.accent : '#fff'}
            />
          ),
        }}>
        {() => <NotFoundView navigation={RootNavigation} />}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={LoggedStack}
        options={{
          tabBarItemStyle: { display: 'none' },
          header: () => <TabNav navigation={RootNavigation} />,
        }}
      />
    </Tab.Navigator>
  );
};
