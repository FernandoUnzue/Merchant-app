import { Colors } from '@core/theme';
import LogoMia from '@core/theme/SVGS/Logo';
import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';

type LoadingProps = {
  logo?: boolean;
  error?: string;
};

const Loading: React.FC<LoadingProps> = ({ logo = true, error }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        height: 100,
      }}>
      <View
        style={{
          padding: 50,
          alignItems: 'center',
          paddingVertical: '65%',
        }}>
        <ActivityIndicator size="large" color={Colors.accent} />
        {logo && <LogoMia size={100} textColor="#000" />}
      </View>
      <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
    </View>
  );
};

export default Loading;
