import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  DeleteUltimoMovParamList,
  SustitutionCardParamList,
} from '@modules/logged';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { Spacer } from '@components/Spacer';
import CheckIcon from '@core/theme/SVGS/Movements/Check';
import { Button } from '@components/Button';
import OkIcon from '@core/theme/SVGS/OkIcon';

/**
 * Types
 */

type SuccessScreenSustitutionCardProps = StackScreenProps<
  SustitutionCardParamList,
  'SuccessSustitutionCardScreen'
>;

const SuccessSustitutionCardScreen: React.FC<
  SuccessScreenSustitutionCardProps
> = ({ route, navigation }) => {
  const { message } = route.params;
  const style = useThemedStyles(styles);
  return (
    <ScrollView style={style.main}>
      <Text style={style.title}>Sostituisci card</Text>
      <Spacer height={50} />
      <View style={style.container}>
        <OkIcon size={30} />
        <Spacer height={10} />
        <Text style={style.subtitle}>CONFERMA</Text>
        <Spacer height={10} />
        <Text style={style.text}>Carta sostituita</Text>
        <Text style={style.text}>{message}</Text>
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
          onPress={() =>
            navigation.navigate('SustitutionCardHomeScreen', { qrfound: '' })
          }
        />
      </View>
    </ScrollView>
  );
};

export default SuccessSustitutionCardScreen;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      maxHeight: 1200,
      padding: 20,
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
      padding: 15,
      alignItems: 'center',
    },
  });
