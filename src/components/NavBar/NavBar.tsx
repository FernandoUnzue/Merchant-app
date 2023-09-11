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
import { SelectInput } from '@components/SelectInput';
import RNPickerSelect from 'react-native-picker-select';
import ArrowDown from '@core/theme/SVGS/ArrowDown';
import {
  DrawerActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useGetCountNotiQuery } from '@core/redux/Api/endpoints/Notifications';
import SettingsIcon from '@core/theme/SVGS/Movements/Settings';
import { AuthSlice, LogOutAsync } from '@core/redux/authSlice/authSlice';
import { Switch } from 'react-native';
import Impostazioni from '@core/theme/Merchant/Impostazioni';
import { useColorScheme } from 'react-native';

//types
type TabNavScreenProps = StackScreenProps<LoggedStackParamList, 'TabNav'>;
interface Props {
  navigation: any;
}
export const TabNav: React.FC<Props> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const style = useThemedStyles(styles);
  const route = useRoute();

  const [option, setOption] = useState<string>('');

  const ref = useRef();
  const dispatch = useDispatch<AppDispatch>();
  const logoutIntern = () => {
    dispatch(LogOutAsync());
  };

  const theme = useTheme();

  const showMenu = useSelector((state: RootState) => state.auth.showModal);

  const isDarkMode = useSelector((state: RootState) => state.auth.darkMode);

  const colorScheme = useColorScheme();

  const [enabled, setEnabled] = useState<boolean>(isDarkMode);

  const toggleEnabled = () => {
    setEnabled(!enabled);
    dispatch(AuthSlice.actions.ToggleTheme());
  };

  const options = [
    {
      label: 'Modifica Password',
      value: 'modificapass',
    },
    {
      label: 'Log Out',
      value: 'logout',
    },
  ];

  const nav = useNavigation();

  useEffect(() => {
    if (option === 'logout') {
      logoutIntern();
    } else if (option === 'modificapass') {
      navigation.navigate('ChangePasswordDraft');
    }
  }, [option]);

  useEffect(() => {
    if (isDarkMode) {
      setEnabled(true);
    } else if (!isDarkMode) {
      setEnabled(false);
    }
  }, [isDarkMode]);

  return (
    <View style={style.containerNav}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <LogoMia
          size={65}
          textColor={colorScheme === 'dark' || isDarkMode ? '#000' : '#fff'}
          miaColor={colorScheme === 'dark' || isDarkMode ? '#000' : '#fff'}
        />
      </View>
      <View style={style.containerTabNav}>
        <TouchableOpacity
          onPress={() => nav.dispatch(DrawerActions.openDrawer)}>
          <Impostazioni
            size={40}
            styles={{
              marginTop: 10,
            }}
            color={colorScheme === 'dark' || isDarkMode ? '#000' : '#fff'}
          />
        </TouchableOpacity>
      </View>
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
      backgroundColor: theme.colors.backgroundNegative,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      borderBottomWidth: 1,
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
