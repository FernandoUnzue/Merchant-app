import ModalAsk from '@components/ModalAsk';
import { AuthSlice, LogOutAsync } from '@core/redux/authSlice/authSlice';
import { AppDispatch, RootState } from '@core/redux/store';
import {
  Colors,
  ColorsGeneralDark,
  Fonts,
  generalColorsNew,
  ThemeContext,
  useThemedStyles,
} from '@core/theme';
import Impostazioni from '@core/theme/Merchant/Impostazioni';
import ArrowRightIcon from '@core/theme/SVGS/ArrowRight';
import BellIcon from '@core/theme/SVGS/Bell';
import LogoutIcon from '@core/theme/SVGS/Movements/Logout';
import UserDataIcon from '@core/theme/SVGS/Movements/UserData';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  navigation: any;
};

const ToggleMenu: React.FC<Props> = ({ navigation }) => {
  const style = useThemedStyles(styles);

  const [showModalLogOut, setShowModalLogOut] = useState<boolean>(false);

  const showMenu = useSelector((state: RootState) => state.auth.showModal);

  const customerRegistered = useSelector(
    (state: RootState) => state.customer.registered,
  );

  const dispatch = useDispatch<AppDispatch>();
  const logoutIntern = () => {
    dispatch(LogOutAsync());
    dispatch(AuthSlice.actions.closeModal());
  };
  const state = navigation.getState();

  console.log(`state ${JSON.stringify(state)}`);
  interface ItemsMenu {
    id: number;
    name: string;
    icon: ReactNode;
    onPress: () => void;
  }
  const items: Array<ItemsMenu> = [
    {
      id: 0,
      name: 'Member Card',
      icon: (
        <Impostazioni
          size={35}
          color={state?.index === 0 ? generalColorsNew.orange : '#000'}
        />
      ),
      onPress: () => {
        navigation.navigate('MemberCardStack');
        dispatch(AuthSlice.actions.closeModal());
      },
    },
    {
      id: 1,
      name: 'Modifica password',
      icon: (
        <Impostazioni
          size={35}
          color={state?.index === 1 ? generalColorsNew.orange : '#000'}
        />
      ),
      onPress: () => {
        navigation.navigate('ModificaPassword');
        dispatch(AuthSlice.actions.closeModal());
      },
    },

    {
      id: 2,
      name: 'Burn Coupon',
      icon: (
        <Impostazioni
          size={35}
          color={state?.index === 2 ? generalColorsNew.orange : '#000'}
        />
      ),
      onPress: () => {
        navigation.navigate('BurnCoupon');
        dispatch(AuthSlice.actions.closeModal());
      },
    },
    {
      id: 3,
      name: 'LogOut',
      icon: <LogoutIcon size={35} color="#000" />,
      onPress: () => setShowModalLogOut(true),
    },
  ];

  if (showMenu && !customerRegistered) {
    return (
      <View style={style.menuContainer}>
        <ScrollView style={style.contToggle}>
          {items.map(item => {
            return (
              <TouchableOpacity onPress={item.onPress} key={item.id}>
                <View style={style.bullet}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        marginRight: 10,
                      }}>
                      {item.icon}
                    </View>

                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontFamily: Fonts.bold,
                        alignSelf: 'center',
                        color:
                          state?.index === item.id
                            ? generalColorsNew.orange
                            : Colors.black,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                    }}>
                    <ArrowRightIcon
                      size={30}
                      color={
                        state?.index === item.id
                          ? generalColorsNew.orange
                          : '#000'
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <ModalAsk
          show={showModalLogOut}
          closeModal={() => {
            setShowModalLogOut(false);
            dispatch(AuthSlice.actions.closeModal());
          }}
          onPressConfirm={() => logoutIntern()}
          width={350}
          height={230}
          message={'¿Sei sicuro di voler uscire?'}
          loading={false}
        />
      </View>
    );
  } else {
    return null;
  }
};

export default ToggleMenu;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundNegative,
      paddingHorizontal: 20,
      height: 550,
    },
    contToggle: {
      height: 250,
    },
    badge: {
      borderRadius: 100,
      width: 25,
      height: 25,
      backgroundColor: '#FA5000',
      padding: 2,
      marginTop: 12,
      marginLeft: '35%',
    },
    badgeText: {
      color: theme.colors.textPrimary,
      fontSize: 14,
      fontFamily: theme.fonts.bold,
      textAlign: 'center',
    },
    bullet: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      //   borderBottomWidth: 1,
      //   borderBottomColor: '#000',
    },
    menuContainer: {
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: '#fff',
      padding: 20,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,

      elevation: 8,
    },
    cardImage: {
      maxWidth: 380,
      maxHeight: 251,
    },
    firstWrapper: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: 10,
      borderWidth: 1,
      borderColor: '#909090',
      borderRadius: 10,
      maxWidth: 380,
    },
    consumerWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    textCont: {
      alignSelf: 'center',
      marginRight: 10,
      alignItems: 'flex-start',
      flex: 1,
    },
    textCont1: {
      alignSelf: 'center',
      alignItems: 'flex-end',
    },
    bold: {
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold,
      color: theme.colors.textPrimary,
    },
    number: {
      fontWeight: '900',
      fontSize: 24,
      fontFamily: theme.fonts.bold,
      color: theme.colors.textPrimary,
    },
    numberGreen: {
      //   fontWeight: '900',
      fontSize: 22,
      fontFamily: theme.fonts.bold,
      color: 'green',
    },
    title: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.textPrimary,
      fontSize: 14,
    },
    iconShirt: {
      width: 35,
      height: 40,
      marginRight: 10,
    },
    iconHeart: {
      width: 35,
      height: 30,
      marginTop: 10,
      marginRight: 10,
    },
    carIcon: {
      width: 45,
      height: 23,
      marginTop: 15,
      marginRight: 10,
    },
  });
