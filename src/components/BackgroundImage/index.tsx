import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React, { ReactNode } from 'react';
import { Image } from 'react-native';

type Props = {
  children: ReactNode;
  height?: number;
  dark?: boolean;
};

const BackgroundImageContainer: React.FC<Props> = ({
  children,
  height = 300,
  dark = false,
}) => {
  const { width } = useWindowDimensions();
  return (
    <React.Fragment>
      <Image
        source={
          dark
            ? require('../../../assets/images/borderBlueDarkTop.png')
            : require('../../../assets/images/borderBlueTop.png')
        }
        style={{
          width: width - 20,
          height: 20,
        }}
      />
      <View
        style={{
          width: width - 20,
          minHeight: height,
          borderRadius: 1,
          backgroundColor: '#DDEAF8',
        }}>
        {children}
      </View>
      <Image
        source={
          dark
            ? require('../../../assets/images/borderBlueDarkDown.png')
            : require('../../../assets/images/borderBlueDown.png')
        }
        style={{
          width: width - 20,
          height: 20,
        }}
      />
    </React.Fragment>
  );
};

export default BackgroundImageContainer;

const styles = StyleSheet.create({});
