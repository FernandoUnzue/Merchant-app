import { RootState } from '@core/redux/store';
import { Colors, ColorsGeneralLight } from '@core/theme';
import LogoMia from '@core/theme/SVGS/Logo';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

type LoadingProps = {
  logo?: boolean;
  error?: string;
};

const Loading: React.FC<LoadingProps> = ({ logo = true, error }) => {
  const isDarkMode = useSelector((state: RootState) => state.auth.darkMode);

  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === 'dark' || isDarkMode
            ? ColorsGeneralLight.backgroundNegative
            : ColorsGeneralLight.backgroundNegative,
        height: 100,
      }}>
      <View
        style={{
          padding: 50,
          alignItems: 'center',
          paddingVertical: '65%',
        }}>
        <ActivityIndicator size="large" color={'#fff'} />
        {logo && (
          <LogoMia
            size={100}
            textColor={colorScheme === 'dark' || isDarkMode ? '#000' : '#fff'}
            miaColor={colorScheme === 'dark' || isDarkMode ? '#000' : '#fff'}
          />
        )}
      </View>
      <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
    </View>
  );
};

export default Loading;
