import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { LoggedStackParamList } from '@modules/logged';
import OkIcon from '@core/theme/SVGS/OkIcon';
import BackNav from '@components/BackNav';
import { Spacer } from '@components/Spacer';
import { Button } from '@components/Button';

/**
 * Types
 */

type SuccessBurnCouponScreenProps = StackScreenProps<
  LoggedStackParamList,
  'SuccessBurnCouponScreen'
>;

const SuccessBurnCouponScreen: React.FC<SuccessBurnCouponScreenProps> = ({
  navigation,
  route,
}) => {
  const style = useThemedStyles(styles);
  return (
    <ScrollView contentContainerStyle={style.main}>
      <BackNav navigation={navigation} />
      <Text style={style.title}>SuccessBurnCouponScreen</Text>
      <Spacer height={50} />
      <OkIcon size={200} styles={{ alignSelf: 'center' }} />
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

export default SuccessBurnCouponScreen;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 22,
      fontFamily: theme.fonts.bold,
      color: theme.colors.textPrimary,
    },
  });
