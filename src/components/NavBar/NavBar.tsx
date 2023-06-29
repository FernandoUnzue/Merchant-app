import React, { useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';
import { Colors, Fonts, ThemeContext, useThemedStyles } from '@core/theme';
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  // const navigationTab = useNavigation();
  console.log(route);
  return (
    <ContainerNav
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        //  paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 10,
      }}>
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
      <ContainerTabNav>
        {/*<TouchableOpacity
          onPress={() => console.log('press 1')}
          style={{ marginRight: 10 }}>
          <MapPinIcon size={30} color={'#000'} />
      </TouchableOpacity>*/}
        <TouchableOpacity
          onPress={() => console.log('press 2')}
          style={{ marginRight: 10 }}>
          <EuroIcon size={30} color={'#000'} />
        </TouchableOpacity>
        <Pressable
          onPress={() => navigation.navigate('Profile')}
          style={{ marginRight: 10 }}
          hitSlop={20}>
          <View style={{ position: 'relative' }}>
            {data && data.notificationCount > 0 && (
              <View style={style.badge}>
                <Text style={style.textBadge}>{data.notificationCount}</Text>
              </View>
            )}

            <ProfileIcon
              size={30}
              color={route.name === 'Profile' ? Colors.accent : '#000'}
            />
          </View>
        </Pressable>
      </ContainerTabNav>
    </ContainerNav>
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
  });
const pickerSelectStyles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    inputIOSContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //  backgroundColor: 'white',
      width: '100%',
      borderBottomColor: Colors.text,
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
      borderBottomColor: theme.colors.text,
      borderBottomWidth: 1,
    },
    inputAndroid: {
      flex: 1,
      height: 36,
      paddingBottom: 3,
      paddingHorizontal: 5,
      fontFamily: theme.fonts.bold,
      fontSize: 15,
      color: Colors.text,
    },
    placeholder: {
      fontFamily: theme.fonts.regular,
      fontSize: 18,
      color: Colors.text,
    },
  });
