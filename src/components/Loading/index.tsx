import { RootState } from '@core/redux/store';
import {
  Colors,
  ColorsGeneralDark,
  ColorsGeneralLight,
  generalColorsNew,
} from '@core/theme';
import LogoSkey from '@core/theme/Merchant/LogoSkey';
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
        backgroundColor: generalColorsNew.accent,
        height: 100,
      }}>
      <View
        style={{
          padding: 50,
          alignItems: 'center',
          paddingVertical: '65%',
        }}>
        <ActivityIndicator
          size="large"
          color={colorScheme === 'dark' || isDarkMode ? '#000' : '#fff'}
        />
        {logo && <LogoSkey size={100} />}
      </View>
      <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
    </View>
  );
};

export default Loading;
