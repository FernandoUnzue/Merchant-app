import { FC } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { isSmallDevice } from '@core/helpers';
import { useNavigation } from '@react-navigation/native';
import LogoMia from '@core/theme/SVGS/Logo';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';
import HandIcon from '@core/theme/Merchant/HandIcon';
import { Separator } from '@components/Separator';

/**
 * LoginHeader
 */

export const LoginHeader: FC = () => {
  const style = useThemedStyles(styles);

  const { top } = useSafeAreaInsets();
  const navifgation = useNavigation();
  const isDarkMode = useSelector((state: RootState) => state.auth.darkMode);

  const colorScheme = useColorScheme();

  return (
    <View style={[style.container]}>
      <Separator height={80} />
      <View style={{ flexDirection: 'row' }}>
        <HandIcon size={70} styles={{ marginTop: 15 }} />
        <Text style={style.title}>CIAO!</Text>
      </View>
    </View>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.accent,
      alignItems: 'center',
    },
    title: {
      fontSize: 30,
      fontFamily: theme.fonts.bold,
      color: theme.colors.textNegative,
      paddingTop: 35,
    },
    image: {
      height: isSmallDevice() ? 100 : 130,
      aspectRatio: 1,
    },
  });
