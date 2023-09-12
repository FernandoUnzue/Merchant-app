import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { MemberCardStackParamList } from '@modules/logged';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@core/redux/store';
import BackNav from '@components/BackNav';
import { Spacer } from '@components/Spacer';
import { Button } from '@components/Button';
import { CustomerSlice } from '@core/redux/customerSlice';

/**
 * Types
 */

type HomeScreenMemberCardPrivateProps = StackScreenProps<
  MemberCardStackParamList,
  'MemberCardHomePrivate'
>;

const HomeMemberCardPrivate: React.FC<HomeScreenMemberCardPrivateProps> = ({
  navigation,
}) => {
  const style = useThemedStyles(styles);
  const customer = useSelector((state: RootState) => state.customer);
  const user = useSelector((state: RootState) => state.customer.userInfo);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View style={style.main}>
      <BackNav navigation={navigation} text={false} />
      <Text style={style.title}>HomeMemberCard</Text>
      <View style={style.squareContent}>
        <Text style={style.textBold}>NAME</Text>
        <Text style={style.text}>
          {user?.name} {user?.lastName}
        </Text>
        <Spacer height={20} />
        <Text style={style.textBold}>CARD Nº</Text>
        <Text style={style.text}>{customer.card}</Text>
        <Spacer height={20} />
        <Text style={style.textBold}>WALLET</Text>
        <Text style={style.text}>{`${customer.amount
          ?.toFixed(2)
          .replace('.', ',')}€`}</Text>
        <Spacer height={20} />
        <Button
          type="primary"
          accessibilityLabel="SET MEMBER"
          title="SET MEMBER"
          onPress={() => dispatch(CustomerSlice.actions.setUserTest())}
        />
      </View>
    </View>
  );
};

export default HomeMemberCardPrivate;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 10,
    },
    title: {
      fontSize: 18,
      fontFamily: theme.fonts.bold,
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    text: {
      fontSize: 12,
      color: theme.colors.textPrimary,
    },
    textBold: {
      fontSize: 13,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
    },
    squareContent: {
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 30,
      alignItems: 'center',
    },
  });
