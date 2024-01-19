import {
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { Spacer } from '@components/Spacer';
import WarningIcon from '@core/theme/SVGS/WarningIcon';
import { Button } from '@components/Button';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { PonderazioneParamList } from '@modules/logged';
import OkIcon from '@core/theme/SVGS/OkIcon';

/**
 * Types
 */

type SuccessScreenPonderazioneProps = StackScreenProps<
  PonderazioneParamList,
  'PonderazioneSuccess'
>;

const SuccessPonderazioneScreen: React.FC<SuccessScreenPonderazioneProps> = ({
  navigation,
  route,
}) => {
  const { message } = route.params;
  const style = useThemedStyles(styles);

  useEffect(() => {
    const backAction = () => {
      //  openModal();
      // Alert.alert('back');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  return (
    <ScrollView style={style.main}>
      <Text style={style.title}>Ponderazione cashback</Text>
      <Spacer height={50} />
      <View style={style.container}>
        <OkIcon size={30} />
        <Spacer height={10} />
        <Text style={style.subtitle}>CONFERMA</Text>
        <Spacer height={10} />
        <Text style={style.text}>Ponderazione modificata</Text>
        <Text style={style.text}>{message}</Text>
        <Text style={style.text}></Text>
        <Spacer height={20} />

        <Image
          source={require('../../../../../../assets/images/OK.png')}
          style={style.img}
        />
        <Spacer height={10} />
        <Button
          accessibilityLabel="chiudi"
          type="primary"
          title="Chiudi"
          onPress={() => navigation.navigate('PonderazioneHomeScreen')}
        />
      </View>
    </ScrollView>
  );
};

export default SuccessPonderazioneScreen;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      maxHeight: 1200,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
    },
    img: {
      width: 200,
      height: 200,
    },
    title: {
      fontSize: 20,
      fontFamily: theme.fonts.instBold,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      fontFamily: theme.fonts.instBold,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text: {
      color: '#4E4E4E',
    },
    container: {
      borderWidth: 1,
      borderColor: '#ddd',
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 30,
      alignItems: 'center',
    },
  });
