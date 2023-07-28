import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ColorsGeneralLight, ThemeContext, useThemedStyles } from '@core/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { LoggedStackParamList } from '@modules/logged';
import OkIcon from '@core/theme/SVGS/OkIcon';
import BackNav from '@components/BackNav';
import { Spacer } from '@components/Spacer';
import { Button } from '@components/Button';

/**
 * Types
 */

type PreviewScreenCouponBurnProps = StackScreenProps<
  LoggedStackParamList,
  'PreviewScreenCouponBurn'
>;

const PreviewScreenCouponBurn: React.FC<PreviewScreenCouponBurnProps> = ({
  navigation,
  route,
}) => {
  const { isDirty, isValid } = route.params;
  const style = useThemedStyles(styles);
  return (
    <ScrollView contentContainerStyle={style.main}>
      <BackNav navigation={navigation} />
      <Text style={style.title}>Preview Screen Coupon Burn</Text>
      <Spacer height={50} />
      <OkIcon
        size={200}
        styles={{ alignSelf: 'center' }}
        color={ColorsGeneralLight.backgroundNegative}
      />
      <Spacer height={50} />
      <Button
        accessibilityLabel="OK"
        title="OK"
        onPress={
          !isDirty || !isValid
            ? () => navigation.navigate('ErrorScreenCouponBurn')
            : () => navigation.navigate('SuccessBurnCouponScreen')
        }
        type="primary"
      />
    </ScrollView>
  );
};

export default PreviewScreenCouponBurn;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 22,
      fontFamily: theme.fonts.bold,
      color: theme.colors.textPrimary,
    },
  });
