import ModalAsk from '@components/ModalAsk';
import TabNav from '@components/NavBar/NavBar';
import { AuthSlice, LogOutAsync } from '@core/redux/authSlice/authSlice';
import { AppDispatch, RootState } from '@core/redux/store';
import { ColorsGeneralDark } from '@core/theme';
import Impostazioni from '@core/theme/Merchant/Impostazioni';
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
  InfoClient: undefined;
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
        header: () => <TabNav navigation={RootNavigation} />,
        drawerStyle: {
          backgroundColor: ColorsGeneralDark.backgroundNegative,
        },
        drawerActiveTintColor: ColorsGeneralDark.background,
      }}
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName={'MemberCardStack'}>
      <Drawer.Screen
        name="MemberCardStack"
        component={MemberCardStack}
        options={{
          drawerItemStyle: { display: 'none' },
          drawerLabel: 'Member Card',
          drawerIcon: resp => (
            <Impostazioni
              size={30}
              color={resp.focused ? ColorsGeneralDark.background : '#000'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ModificaPassword"
        component={InfoOperatorStack}
        options={{
          drawerLabel: 'Modifica Password',
          drawerIcon: resp => (
            <Impostazioni
              size={30}
              color={resp.focused ? ColorsGeneralDark.background : '#000'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="BurnCoupon"
        component={BurnCouponStack as never}
        options={{
          drawerLabel: 'Burn Coupon',
          drawerIcon: resp => (
            <Impostazioni
              size={30}
              color={resp.focused ? ColorsGeneralDark.background : '#000'}
            />
          ),
        }}
      />

      <Drawer.Group>
        <Drawer.Screen
          name="Spesa"
          component={SpesaFlowStack}
          options={{
            drawerItemStyle: customer.registered ? null : { display: 'none' },
            drawerLabel: 'Spesa',
            drawerIcon: resp => (
              <RiscattoIcon
                size={30}
                color={resp.focused ? ColorsGeneralDark.background : '#000'}
              />
            ),
          }}
        />
      </Drawer.Group>
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
