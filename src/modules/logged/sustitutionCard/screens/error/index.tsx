import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  DeleteUltimoMovParamList,
  SustitutionCardParamList,
} from '@modules/logged';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { Spacer } from '@components/Spacer';
import WarningIcon from '@core/theme/SVGS/WarningIcon';
import { Button } from '@components/Button';

/**
 * Types
 */

type ErrorScreenSustitutionCardProps = StackScreenProps<
  SustitutionCardParamList,
  'ErrorSustitutionCardScreen'
>;

const ErrorSustitutionCardScreen: React.FC<ErrorScreenSustitutionCardProps> = ({
  route,
  navigation,
}) => {
  // const { errorMessage } = route.params;
  const style = useThemedStyles(styles);

  const { message } = route.params;

  return (
    <ScrollView style={style.main}>
      <Text style={style.title}>Sostituisci card</Text>
      <Spacer height={50} />
      <View style={style.container}>
        <WarningIcon size={30} />
        <Spacer height={10} />
        <Text style={style.subtitle}>ERRORE</Text>
        <Spacer height={10} />
        <Text style={style.text}>
          Non è stato possibile eliminare il movimento
        </Text>
        <Text style={style.text}>{message}</Text>
        <Text style={style.text}></Text>
        <Spacer height={20} />

        <Image
          source={require('../../../../../../assets/images/KO.png')}
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

export default ErrorSustitutionCardScreen;

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
