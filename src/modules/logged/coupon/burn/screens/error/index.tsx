import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { LoggedStackParamList } from '@modules/logged';
import OkIcon from '@core/theme/SVGS/OkIcon';
import BackNav from '@components/BackNav';
import { Spacer } from '@components/Spacer';
import { Button } from '@components/Button';
import WarningIcon from '@core/theme/SVGS/WarningIcon';

/**
 * Types
 */

type ErrorCouponScreenProps = StackScreenProps<
  LoggedStackParamList,
  'ErrorScreenCouponBurn'
>;

const ErrorScreenCouponBurn: React.FC<ErrorCouponScreenProps> = ({
  navigation,
  route,
}) => {
  const style = useThemedStyles(styles);
  const { coupon } = route.params;
  return (
    <ScrollView contentContainerStyle={style.main}>
      <BackNav navigation={navigation} />
      <Text style={style.title}>Error Screen Coupon Burn</Text>
      <Spacer height={50} />
      <View style={style.square}>
        <WarningIcon size={100} styles={{ alignSelf: 'center' }} />
        <Spacer height={30} />

        <Image
          source={require('../../../../../../../assets/images/Image-error.png')}
          style={style.image}
        />
      </View>
      <Spacer height={50} />
      <Button
        accessibilityLabel="OK"
        title="OK"
        onPress={() => navigation.goBack()}
        type="primary"
      />
    </ScrollView>
  );
};

export default ErrorScreenCouponBurn;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    square: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 20,
    },
    image: {
      width: 200,
      height: 180,
      alignSelf: 'center',
    },
    title: {
      fontSize: 22,
      fontFamily: theme.fonts.bold,
      color: theme.colors.textPrimary,
    },
  });
