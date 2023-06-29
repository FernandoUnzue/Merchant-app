import { Button } from '@components/Button';
import { Api } from '@core/clients/axioss';
import { BalanceProps, ProfileResponse } from '@core/interfaces';
import { useGetCountNotiQuery } from '@core/redux/Api/endpoints/Notifications';
import {
  useGetUserProfileQuery,
  useReloadInfoUserMutation,
} from '@core/redux/Api/endpoints/User';
import { LogOutAsync } from '@core/redux/authSlice/authSlice';
import { AppDispatch } from '@core/redux/store';
import { Colors, Fonts, ThemeContext, useThemedStyles } from '@core/theme';
import ArrowDown from '@core/theme/SVGS/ArrowDown';
import ArrowDownMenu from '@core/theme/SVGS/ArrowDownMenu';
import ArrowRightIcon from '@core/theme/SVGS/ArrowRight';
import ArrowUp from '@core/theme/SVGS/ArrowUp';
import BellIcon from '@core/theme/SVGS/Bell';
import CouponIcon from '@core/theme/SVGS/Category/CouponIcon';
import Coupon2Icon from '@core/theme/SVGS/Coupon2Icon';
import GiftCardIcon from '@core/theme/SVGS/GiftCardIcon';
import FriendsIcon from '@core/theme/SVGS/Movements/Friends';
import LogoutIcon from '@core/theme/SVGS/Movements/Logout';
import PromoIcon from '@core/theme/SVGS/Movements/Promo';
import RecensioniIcon from '@core/theme/SVGS/Movements/Recensioni';
import RegaliIcon from '@core/theme/SVGS/Movements/Regali';
import SettingsIcon from '@core/theme/SVGS/Movements/Settings';
import UserDataIcon from '@core/theme/SVGS/Movements/UserData';
import EuroIcon from '@core/theme/SVGS/NavBar/Euro';
import ProfileIcon from '@core/theme/SVGS/NavBar/Profile';
import RiscattoIcon from '@core/theme/SVGS/RiscattoIcon';
import ShopIcon from '@core/theme/SVGS/TabNav/Shop';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

type Props = {
  navigation: any;
};

const ToggleMenu: React.FC<Props> = ({ navigation }) => {
  const style = useThemedStyles(styles);

  const mockOrders = [{}];
  const [open, setOpen] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const logoutIntern = () => {
    dispatch(LogOutAsync());
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<ProfileResponse>();

  const { data, refetch } = useGetCountNotiQuery();
  const getUserProfile = async () => {
    try {
      setLoading(true);
      const response = await Api({ endpoint: '/api/user', tokenUse: true });

      if (response.status === 200) {
        setLoading(false);
        // const { first_name, last_name, balance } = response.data;
        setUserInfo(response.data);
      }
    } catch (e: any) {
      console.log(e.response.data.errorMessage);

      setLoading(false);
    }
  };
  const {
    data: dataUser,
    isSuccess: isSuccessUser,
    refetch: refectchUser,
    isLoading,
    isFetching,
  } = useGetUserProfileQuery();

  const [reloadInfoUser] = useReloadInfoUserMutation();

  const reloadInfoUserFunc = async () => {
    await reloadInfoUser();
  };

  useEffect(() => {
    if (isSuccessUser) {
      setUserInfo(dataUser);
    }
  }, [dataUser]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
      // refectchUser();
      reloadInfoUserFunc();
    });

    return unsubscribe;
  }, [navigation]);

  interface ItemsMenu {
    id: number;
    name: string;
    icon: ReactNode;
    onPress: () => void;
  }
  const items: Array<ItemsMenu> = [
    {
      id: 1,
      name: 'Dati personali',
      icon: <UserDataIcon size={35} color="#000" />,
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      id: 2,
      name: 'Negozi',
      icon: <ShopIcon size={35} color="#000" />,
      onPress: () => navigation.navigate('PreferidoHomeScreen'),
    },
    {
      id: 4,

      name: 'Le mie Gift',
      icon: <Coupon2Icon size={35} color="#000" />,
      onPress: () => navigation.navigate('GiftCardList'),
    },
    {
      id: 5,
      name: 'Regali',
      icon: <RegaliIcon size={35} color="#000" />,
      onPress: () => navigation.navigate('RegaliScreen'),
    },
    {
      id: 6,
      name: 'Riscatto cashback',
      icon: <RiscattoIcon size={35} color="#000" />,
      onPress: () => navigation.navigate('CashbackRedemptionHomeScreen'),
    },
    {
      id: 7,
      name: 'Impostazioni',
      icon: <SettingsIcon size={35} color="#000" />,
      onPress: () => navigation.navigate('Impostazioni'),
    },
    {
      id: 8,
      name: 'Notifiche',
      icon: <BellIcon size={35} color="#000" />,
      onPress: () => navigation.navigate('Notifications'),
    },
    {
      id: 9,
      name: 'Logout',
      icon: <LogoutIcon size={35} color="#000" />,
      onPress: () => logoutIntern(),
    },
  ];

  const heightAnim = useRef(new Animated.Value(300)).current; // Initial

  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial

  const openMenu = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(heightAnim, {
          toValue: 300,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };
  const closeMenu = () => {
    //  setShowModal(false);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(heightAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };

  return (
    <Animated.View style={style.menuContainer}>
      <Pressable
        style={{ alignSelf: 'center' }}
        onPress={() => {
          setOpen(!open);
          if (open) {
            closeMenu();
          } else {
            openMenu();
          }
        }}
        hitSlop={20}>
        {open ? (
          <ArrowDownMenu size={25} />
        ) : (
          <ArrowDownMenu
            size={25}
            styles={{ transform: [{ rotate: '180deg' }] }}
          />
        )}
      </Pressable>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 15,
        }}>
        <View style={{ maxWidth: 230 }}>
          <Text
            style={{ ...style.bold, fontSize: 20 }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {userInfo?.first_name} {userInfo?.last_name}
          </Text>
        </View>
        <View>
          {isLoading || isFetching ? (
            <View style={{ width: 85, alignContent: 'center' }}>
              <ActivityIndicator
                size={'small'}
                color={Colors.accent}
                style={{ alignSelf: 'center' }}
              />
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <Text style={style.numberGreen}>
                {userInfo?.balance.balancePoints.toFixed(2).replace('.', ',')}€
              </Text>
            </View>
          )}
        </View>
      </View>

      <Animated.ScrollView
        style={{ ...style.contToggle, height: heightAnim, opacity: fadeAnim }}>
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
                      color: Colors.black,
                    }}>
                    {item.name}
                  </Text>
                </View>
                {item.name === 'Notifiche' &&
                  data &&
                  data.notificationCount > 0 && (
                    <View style={style.badge}>
                      <Text style={style.badgeText}>
                        {data.notificationCount}
                      </Text>
                    </View>
                  )}
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <ArrowRightIcon size={30} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>

      <Button
        accessibilityLabel="Invita un amico"
        title="Invita un amico"
        type="quaternary"
        onPress={() => {}}
        icon={<FriendsIcon size={40} color="#000" />}
        stylesTitle={{ textTransform: 'none' }}
      />
    </Animated.View>
  );
};

export default ToggleMenu;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
      paddingHorizontal: 20,
      height: 550,
    },
    contToggle: {
      height: 300,
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
      color: theme.colors.white,
      fontSize: 14,
      fontFamily: theme.fonts.bold,
      textAlign: 'center',
    },
    bullet: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#000',
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
      backgroundColor: theme.colors.grey,
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
      color: theme.colors.black,
    },
    number: {
      fontWeight: '900',
      fontSize: 24,
      fontFamily: theme.fonts.bold,
      color: theme.colors.black,
    },
    numberGreen: {
      //   fontWeight: '900',
      fontSize: 22,
      fontFamily: theme.fonts.bold,
      color: theme.colors.accent,
    },
    title: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.black,
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
