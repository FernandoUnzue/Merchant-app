import DrawerItemCustom from '@components/DrawerItemCustom';
import DrawerItemListCustom from '@components/DrawerItemListCustom';
import ModalAsk from '@components/ModalAsk';
import TabNav from '@components/NavBar/NavBar';
import TabNavSpesa from '@components/NavBarSpesa/NavBar';
import { Spacer } from '@components/Spacer';
import { AuthSlice, LogOutAsync } from '@core/redux/authSlice/authSlice';
import { AppDispatch, RootState } from '@core/redux/store';
import { ColorsGeneralDark, FontsNew, generalColorsNew } from '@core/theme';
import Impostazioni from '@core/theme/Merchant/Impostazioni';
import ArrowCircleIcon from '@core/theme/Merchant/Menu/ArrowCircle';
import BagIcon from '@core/theme/Merchant/Menu/BagIcon';
import ClientIcon from '@core/theme/Merchant/Menu/ClientIcon';
import TicketIcon from '@core/theme/Merchant/Menu/TicketIcon';
import TrashIcon from '@core/theme/Merchant/Menu/TrashIcon';
import ArrowLeftBack from '@core/theme/SVGS/ArrowLeftBack';
import LogoutIcon from '@core/theme/SVGS/Movements/Logout';
import UserDataIcon from '@core/theme/SVGS/Movements/UserData';
import RiscattoIcon from '@core/theme/SVGS/RiscattoIcon';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  BurnCouponStack,
  DeleteUltimoMovStack,
  InfoClientStack,
  InfoOperatorStack,
  MemberCardStack,
  PonderazioneStack,
  SpesaFlowStack,
  SustitutionCardStack,
  UltimoMovStack,
} from '.';
import DeleteLastMovementHome from './lastMov/delete';
import MemberCardHome from './memberCard';
import CarIcon from '@core/theme/SVGS/Movements/Car';
import CardIcon from '@core/theme/Merchant/Menu/CardIcon';

interface HomeLoggedProps {
  RootNavigation: any;
}

export type DrawerStackParamList = {
  BurnCoupon: HomeLoggedProps;
  MemberCardStack: HomeLoggedProps;
  ModificaPassword: undefined;
  Spesa: undefined;
  InfoCliente: undefined;
  UltimoMovimiento: undefined;
  EliminaUltimoMov: undefined;
  SustitutionCard: undefined;
  Ponderazione: undefined;
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
          width: '80%',
        },
        drawerActiveTintColor: ColorsGeneralDark.accent,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
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
          drawerItemStyle: { display: 'none' },
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
          drawerItemStyle: { display: 'none' },
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
        name="Ponderazione"
        component={PonderazioneStack}
        options={{
          drawerItemStyle: { display: 'none' },
          drawerLabel: 'Gestione ponderazione',
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
        name="InfoCliente"
        component={InfoClientStack}
        options={{
          header: () => <TabNavSpesa navigation={RootNavigation} />,
          drawerLabel: 'Info Cliente',
          drawerIcon: resp => <ClientIcon size={20} />,
        }}
      />
      <Drawer.Screen
        name="Spesa"
        component={SpesaFlowStack}
        options={{
          header: () => <TabNavSpesa navigation={RootNavigation} />,
          drawerLabel: 'Spesa',
          drawerIcon: resp => <BagIcon size={20} />,
        }}
      />
      <Drawer.Screen
        name="UltimoMovimiento"
        component={UltimoMovStack}
        options={{
          header: () => <TabNavSpesa navigation={RootNavigation} />,
          drawerLabel: 'Ultimo Movimiento',
          drawerIcon: resp => <TicketIcon size={20} />,
        }}
      />
      <Drawer.Screen
        name="EliminaUltimoMov"
        component={DeleteUltimoMovStack}
        options={{
          header: () => <TabNavSpesa navigation={RootNavigation} />,
          drawerLabel: 'Elimina ultimo movimiento',
          drawerIcon: resp => <TrashIcon size={20} />,
        }}
      />

      <Drawer.Screen
        name="SustitutionCard"
        component={SustitutionCardStack}
        options={{
          header: () => <TabNavSpesa navigation={RootNavigation} />,
          drawerLabel: 'Sostituisci card',
          drawerIcon: resp => <CardIcon size={20} />,
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

const CustomDrawerContent = (props: any) => {
  const [showModalLogOut, setShowModalLogOut] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const logoutIntern = () => dispatch(LogOutAsync());
  const nav = useNavigation();

  return (
    <React.Fragment>
      <View style={{ padding: 20, borderBottomWidth: 1 }}>
        <TouchableOpacity
          onPress={() => nav.dispatch(DrawerActions.toggleDrawer())}>
          <ArrowLeftBack size={20} />
        </TouchableOpacity>
      </View>
      <Spacer height={50} />
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontFamily: FontsNew.instBold, fontSize: 18 }}>
          Funzioni
        </Text>
      </View>
      <Spacer height={30} />
      <DrawerItemListCustom {...props} />

      {/*  <ScrollView>
        <DrawerItemCustom
          {...props}
          activeBackgroundColor={generalColorsNew.accent}
          label="Info Cliente"
          onPress={() => null}
          icon={resp => (
            <ClientIcon
              size={20}
              //  color={resp.focused ? ColorsGeneralDark.background : '#000'}
            />
          )}
          icon1={resp => (
            <ArrowCircleIcon
              size={15}
              //  color={resp.focused ? generalColorsNew.accent : '#000'}
            />
          )}
        />
        <DrawerItemCustom
          {...props}
          activeBackgroundColor={generalColorsNew.accent}
          label="Spesa"
          onPress={() => nav.navigate('Spesa' as never)}
          icon={resp => (
            <BagIcon
              size={20}
              //   color={resp.focused ? ColorsGeneralDark.background : '#000'}
            />
          )}
          icon1={resp => (
            <ArrowCircleIcon
              size={15}
              //   color={resp.focused ? generalColorsNew.accent : '#000'}
            />
          )}
        />
        <DrawerItemCustom
          {...props}
          activeBackgroundColor={generalColorsNew.accent}
          label="Ultimo movimiento"
          onPress={() => null}
          icon={resp => (
            <TicketIcon
              size={20}
              //      color={resp.focused ? ColorsGeneralDark.background : '#000'}
            />
          )}
          icon1={resp => (
            <ArrowCircleIcon
              size={15}
              //   color={resp.focused ? generalColorsNew.accent : '#000'}
            />
          )}
        />
        <DrawerItemCustom
          {...props}
          activeBackgroundColor={generalColorsNew.accent}
          label="Elimina ultimo movimiento"
          onPress={() => null}
          icon={resp => (
            <TrashIcon
              size={20}
              //  color={resp.focused ? ColorsGeneralDark.background : '#000'}
            />
          )}
          icon1={resp => (
            <ArrowCircleIcon
              size={15}
              color={resp.focused ? generalColorsNew.accent : '#000'}
            />
          )}
        />
          </ScrollView>*/}
    </React.Fragment>
  );
};
