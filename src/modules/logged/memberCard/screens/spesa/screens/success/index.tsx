import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SpesaStackParamList } from '@modules/logged';
import { generalColorsNew, ThemeContext, useThemedStyles } from '@core/theme';
import Wallet from '@components/Wallet';
import { Spacer } from '@components/Spacer';
import BackgroundImageContainer from '@components/BackgroundImage';
import { Button } from '@components/Button';
import { useWindowDimensions } from 'react-native';
import CheckIcon from '@core/theme/SVGS/Merchant/CheckIcon';

/**
 * Types
 */

type SuccessScreenProps = StackScreenProps<
  SpesaStackParamList,
  'SuccessSaleScreen'
>;
const SuccessSaleScreen: React.FC<SuccessScreenProps> = ({
  navigation,
  route,
}) => {
  const { amount } = route.params;

  const style = useThemedStyles(styles);

  const { width } = useWindowDimensions();
  return (
    <ScrollView style={style.main}>
      <Wallet />
      <Spacer height={20} />
      <BackgroundImageContainer>
        <View
          style={{
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ width: '50%' }}>
            <Text style={{ textAlign: 'center' }}>MEMO</Text>
          </View>
          <View style={{ width: '50%' }}>
            <CheckIcon size={30} styles={{ alignSelf: 'center' }} />
          </View>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderStyle: 'dashed',
            borderColor: generalColorsNew.darkPurple,
            width: width - 20,
            height: 0.25,
            borderRadius: 1,
          }}
        />
      </BackgroundImageContainer>

      <Spacer height={50} />
      <Button
        type="primary"
        title="TORNA ALLA HOME"
        accessibilityLabel="torna alla home"
        onPress={() => navigation.navigate('HomeSpesa')}
      />
    </ScrollView>
  );
};

export default SuccessSaleScreen;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      maxHeight: 1500,
      backgroundColor: theme.colors.background,
      padding: 10,
    },
    title: {
      fontSize: 18,
    },
  });
