import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ContainerTabNav, ContainerNav, ContainerSelect } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@core/redux/store';
import {
  Colors,
  Fonts,
  generalColorsNew,
  ThemeContext,
  useTheme,
  useThemedStyles,
} from '@core/theme';
import { isSmallDevice } from '@core/helpers';
import LogoMia from '@core/theme/SVGS/Logo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapPinIcon from '@core/theme/SVGS/NavBar/MapPin';
import EuroIcon from '@core/theme/SVGS/NavBar/Euro';
import ProfileIcon from '@core/theme/SVGS/NavBar/Profile';
import { StackScreenProps } from '@react-navigation/stack';
import { LoggedStackParamList } from '@modules/logged';

import {
  DrawerActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { AuthSlice, LogOutAsync } from '@core/redux/authSlice/authSlice';

import Impostazioni from '@core/theme/Merchant/Impostazioni';
import { useColorScheme } from 'react-native';
import LogoSkey from '@core/theme/Merchant/LogoSkey';

//types
type TabNavScreenProps = StackScreenProps<LoggedStackParamList, 'TabNav'>;
interface Props {
  navigation: any;
}
export const TabNav: React.FC<Props> = ({ navigation }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const style = useThemedStyles(styles);
  const customer = useSelector((state: RootState) => state.customer);
  const dispatch = useDispatch<AppDispatch>();
  const logoutIntern = () => {
    dispatch(LogOutAsync());
  };

  const isDarkMode = useSelector((state: RootState) => state.auth.darkMode);

  const colorScheme = useColorScheme();

  const nav = useNavigation();

  const funcFinal = () => {
    if (!customer.registered) {
      if (auth.showModal) {
        return dispatch(AuthSlice.actions.closeModal());
      } else {
        return dispatch(AuthSlice.actions.openModal());
      }
    }
    return nav.dispatch(DrawerActions.openDrawer);
  };

  return (
    <View style={style.containerNav}>
      <View style={style.containerTabNav}>
        <TouchableOpacity onPress={() => funcFinal()}>
          <Impostazioni
            size={40}
            styles={{
              marginTop: 10,
            }}
            color={generalColorsNew.accent}
          />
        </TouchableOpacity>
      </View>
      <View>
        <LogoSkey size={100} styles={{ marginTop: 25 }} />
      </View>
      <View style={{ width: 40 }}></View>
    </View>
  );
};

export default TabNav;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    image: {
      height: 100,
      aspectRatio: 1,
      width: 80,
    },
    colorAccent: {
      color: theme.colors.backgroundNegative,
    },
    badge: {
      borderRadius: 100,
      width: 21,
      height: 21,
      backgroundColor: '#FA5000',
      padding: 3,
      position: 'absolute',
      top: 0,
      left: 18,
      zIndex: 9999,
    },
    textBadge: {
      fontSize: 10,
      color: '#FFF',
      textAlign: 'center',
      fontFamily: theme.fonts.bold,
    },
    containerNav: {
      width: '100%',
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      //  borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      height: 60,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      //  shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
    },
    containerTabNav: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 'auto',
      gap: 10,
    },
    text: {
      fontSize: 9,
      marginRight: 10,
      marginTop: 10,
      color: theme.colors.textNegative,
    },
  });
const pickerSelectStyles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    inputIOSContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //  backgroundColor: 'white',
      width: '100%',
      borderBottomColor: theme.colors.textPrimary,
      borderBottomWidth: 1,
    },
    inputIOS: {
      flex: 1,
      height: 30,
      paddingHorizontal: 5,
      fontFamily: theme.fonts.regular,
      fontSize: 15,
      color: Colors.text,
    },
    inputAndroidContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //  backgroundColor: 'white',
      width: '100%',
      borderBottomColor: theme.colors.textPrimary,
      borderBottomWidth: 1,
    },
    inputAndroid: {
      flex: 1,
      height: 36,
      paddingBottom: 3,
      paddingHorizontal: 5,
      fontFamily: theme.fonts.bold,
      fontSize: 15,
      color: theme.colors.textPrimary,
    },
    placeholder: {
      fontFamily: theme.fonts.regular,
      fontSize: 18,
      color: theme.colors.textPrimary,
    },
  });
