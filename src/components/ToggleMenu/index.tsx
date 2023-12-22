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
import GiftCardIcon from '@core/theme/SVGS/GiftCardIcon';
import LogoutIcon from '@core/theme/SVGS/Movements/Logout';
import UserDataIcon from '@core/theme/SVGS/Movements/UserData';
import PercentIcon from '@core/theme/SVGS/TabNav/Percent';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  navigation: any;
};

const ToggleMenu: React.FC<Props> = ({ navigation }) => {
  const style = useThemedStyles(styles);

  const [showModalLogOut, setShowModalLogOut] = useState<boolean>(false);
  const auth = useSelector((state: RootState) => state.auth);
  const showMenu = useSelector((state: RootState) => state.auth.showModal);

  const customer = useSelector((state: RootState) => state.customer);

  const dispatch = useDispatch<AppDispatch>();
  const logoutIntern = () => {
    dispatch(LogOutAsync());
    dispatch(AuthSlice.actions.closeModal());
  };
  const state = navigation.getState();

  //  console.log(`state ${JSON.stringify(state)}`);
  interface ItemsMenu {
    id: number;
    name: string;
    //   icon: ReactNode;
    onPress: () => void;
  }
  const items: Array<ItemsMenu> = [
    {
      id: 1,
      name: 'Modifica password',
      onPress: () => {
        navigation.navigate('ModificaPassword');
        dispatch(AuthSlice.actions.closeModal());
      },
    },

    {
      id: 3,
      name: 'Gestione ponderazione',
      onPress: () => {
        navigation.navigate('Ponderazione');
        dispatch(AuthSlice.actions.closeModal());
      },
    },
    {
      id: 4,
      name: 'Log out',
      onPress: () => setShowModalLogOut(true),
    },
  ];

  useEffect(() => {
    if (!customer.registered || !auth.loggedIn)
      dispatch(AuthSlice.actions.closeModal());
  }, [customer, auth.loggedIn]);

  if (showMenu) {
    return (
      <>
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
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 20,
                          fontFamily: Fonts.instRegular,
                          fontWeight: 'bold',
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
        </View>
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
      </>
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
      height: 200,
    },
    modalOverlay: {
      position: 'relative',
      height: 500,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
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
      fontFamily: theme.fonts.instBold,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    bullet: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
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
