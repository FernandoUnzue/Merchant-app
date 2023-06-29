import { FC } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { isSmallDevice } from '@core/helpers';
import { useNavigation } from '@react-navigation/native';

/**
 * LoginHeader
 */

export const LoginHeader: FC = () => {
  const style = useThemedStyles(styles);

  const { top } = useSafeAreaInsets();
  const navifgation = useNavigation();

  return (
    <View style={[style.container]}>
      <Pressable onPress={() => navifgation.navigate('Presentation' as never)}>
        <Image
          source={require('../../../assets/images/mia-logo.png')}
          style={style.image}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.white,
      alignItems: 'center',
    },
    image: {
      height: isSmallDevice() ? 100 : 130,
      aspectRatio: 1,
    },
  });
