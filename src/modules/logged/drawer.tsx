import ModalAsk from '@components/ModalAsk';
import TabNav from '@components/NavBar/NavBar';
import TabNavSpesa from '@components/NavBarSpesa/NavBar';
import { AuthSlice, LogOutAsync } from '@core/redux/authSlice/authSlice';
import { AppDispatch, RootState } from '@core/redux/store';
import { ColorsGeneralDark } from '@core/theme';
import Impostazioni from '@core/theme/Merchant/Impostazioni';
import BagIcon from '@core/theme/Merchant/Menu/BagIcon';
import TicketIcon from '@core/theme/Merchant/Menu/TicketIcon';
import LogoutIcon from '@core/theme/SVGS/Movements/Logout';
import UserDataIcon from '@core/theme/SVGS/Movements/UserData';
import RiscattoIcon from '@core/theme/SVGS/RiscattoIcon';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { FC, useState } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  BurnCouponStack,
  InfoOperatorStack,
  MemberCardStack,
  SpesaFlowStack,
} from '.';
import MemberCardHome from './memberCard';

interface HomeLoggedProps {
  RootNavigation: any;
}

export type DrawerStackParamList = {
  BurnCoupon: HomeLoggedProps;
  MemberCardStack: HomeLoggedProps;
  ModificaPassword: undefined;
  Spesa: undefined;
};
const Drawer = createDrawerNavigator<DrawerStackParamList>();

/**
 * Navigator
 */
interface Props {
  RootNavigation: any;
}

const DrawerStack: FC<Props> = ({ RootNavigation }) => {
  const customer = useSelector((state: RootState) => state.customer);
  return (
    <Drawer.Navigator
      screenOptions={{
        // headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: ColorsGeneralDark.backgroundNegative,
        },
        drawerActiveTintColor: ColorsGeneralDark.accent,
      }}
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName={'BurnCoupon'}>
      <Drawer.Screen
        name="MemberCardStack"
        component={MemberCardStack}
        options={{
          drawerItemStyle: { display: 'none' },
          drawerLabel: 'Member Card',
          header: () => <TabNav navigation={RootNavigation} />,
          drawerIcon: resp => (
            <Impostazioni
              size={30}
              color={resp.focused ? ColorsGeneralDark.accent : '#000'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ModificaPassword"
        component={InfoOperatorStack}
        options={{
          drawerLabel: 'Modifica Password',
          header: () => <TabNav navigation={RootNavigation} />,
          drawerIcon: resp => (
            <Impostazioni
              size={30}
              color={resp.focused ? ColorsGeneralDark.accent : '#000'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="BurnCoupon"
        component={BurnCouponStack as never}
        options={{
          drawerLabel: 'Burn Coupon',
          header: () => <TabNav navigation={RootNavigation} />,
          drawerIcon: resp => (
            <Impostazioni
              size={30}
              color={resp.focused ? ColorsGeneralDark.accent : '#000'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Spesa"
        component={SpesaFlowStack}
        options={{
          drawerItemStyle: customer.registered ? null : { display: 'none' },
          header: () => <TabNavSpesa navigation={RootNavigation} />,
          drawerLabel: 'Spesa',
          drawerIcon: resp => (
            <BagIcon
              size={30}
              // color={resp.focused ? ColorsGeneralDark.background : '#000'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerStack;

const DrawerContent = (props: any) => {
  const [showModalLogOut, setShowModalLogOut] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const logoutIntern = () => dispatch(LogOutAsync());

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        onPress={() => setShowModalLogOut(true)}
        icon={resp => (
          <LogoutIcon
            size={30}
            color={resp.focused ? ColorsGeneralDark.background : '#000'}
          />
        )}
      />
      <ModalAsk
        show={showModalLogOut}
        closeModal={() => setShowModalLogOut(false)}
        onPressConfirm={() => logoutIntern()}
        width={350}
        height={230}
        message={'¿Sei sicuro di voler uscire?'}
        loading={false}
      />
    </DrawerContentScrollView>
  );
};
