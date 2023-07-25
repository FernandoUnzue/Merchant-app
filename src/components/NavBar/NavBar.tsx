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
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetCountNotiQuery } from '@core/redux/Api/endpoints/Notifications';
import SettingsIcon from '@core/theme/SVGS/Movements/Settings';
import { LogOutAsync } from '@core/redux/authSlice/authSlice';

//types
type TabNavScreenProps = StackScreenProps<LoggedStackParamList, 'TabNav'>;
interface Props {
  navigation: any;
}
export const TabNav: React.FC<Props> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const style = useThemedStyles(styles);
  const route = useRoute();
  const { data, refetch } = useGetCountNotiQuery();

  const [option, setOption] = useState<string>('');

  const ref = useRef();
  const dispatch = useDispatch<AppDispatch>();
  const logoutIntern = () => {
    dispatch(LogOutAsync());
  };

  const theme = useTheme();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (option === 'logout') {
      logoutIntern();
    } else if (option === 'modificapass') {
      navigation.navigate('ChangePasswordDraft');
    }
  }, [option]);

  // const navigationTab = useNavigation();
  console.log(route);
  return (
    <View style={style.containerNav}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <LogoMia size={65} textColor={'#000'} />
        {/* <ContainerSelect>
          <RNPickerSelect
            placeholder={{
              label: 'location',
              value: '',
            }}
            onValueChange={value => console.log('value: ' + value)}
            items={[
              {
                label: 'MI',
                value: 'MI',
              },
            ]}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,

              inputAndroid: {
                fontSize: 18,
                fontFamily: Fonts.bold,
                color: Colors.black,
                alignSelf: 'center',
              },
              inputAndroidContainer: {
                height: 45,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 5,
              },
              inputIOSContainer: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                //  backgroundColor: 'white',
                width: '100%',
                // borderBottomColor: Colors.black,
                // borderBottomWidth: 1,
              },
              inputIOS: {
                flex: 1,
                height: 40,
                paddingHorizontal: 5,
                fontFamily: Fonts.bold,
                fontSize: 18,
                color: Colors.text,
              },
            }}
            value={'MI'}
            Icon={() => <ArrowDown size={20} styles={{ marginTop: 5 }} />}
          />
        </ContainerSelect>*/}
      </View>

      <View style={style.containerTabNav}>
        <RNPickerSelect
          ref={() => ref}
          onValueChange={value => setOption(value)}
          items={[
            {
              label: 'Modifica Password',
              value: 'modificapass',
            },
            {
              label: 'Log Out',
              value: 'logout',
            },
          ]}>
          <SettingsIcon
            size={40}
            styless={{
              marginTop: 10,
            }}
            color={theme.theme.colors.textPrimary}
          />
        </RNPickerSelect>
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
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      height: 60,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
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
