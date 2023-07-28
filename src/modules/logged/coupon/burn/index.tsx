import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { LoggedStackParamList } from '../..';
import ToggleMenu from '@components/ToggleMenu';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { useForm } from 'react-hook-form';
import { FormInput } from '@components/FormInput';
import { Button } from '@components/Button';
import BackNav from '@components/BackNav';
import { useDispatch } from 'react-redux';
import { AuthSlice } from '@core/redux/authSlice/authSlice';
import { Spacer } from '@components/Spacer';

/**
 * Types
 */

type HomeScreenProps = StackScreenProps<LoggedStackParamList, 'Home'>;

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { height: windowHeigth, width: windowWidth } = useWindowDimensions();

  const style = useThemedStyles(styles);
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'all',
    //   defaultValues: DEFAULT_VALUES,
    //   resolver: yupResolver(userSchema),
  });

  const dispatch = useDispatch();
  return (
    <ScrollView contentContainerStyle={style.main}>
      <BackNav navigation={navigation} />
      <Text style={style.title}>Burn Coupon</Text>
      <View style={style.container}>
        <FormInput
          control={control}
          name={'search'}
          placeholder="NUMERO CARD"
          styless={{
            backgroundColor: 'transparent',
          }}
          showIcons={false}
          rules={{
            required: true,
            minLenght: 1,
          }}
        />
        <Button
          accessibilityLabel="incerisi"
          title="INSERICI"
          type="primary"
          onPress={() =>
            navigation.navigate('PreviewScreenCouponBurn', {
              isDirty: isDirty,
              isValid: isValid,
            })
          }
        />
      </View>

      {/*  <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          maxHeight: windowHeigth - 155,
        }}>
        <ToggleMenu navigation={navigation} />
      </View>*/}
    </ScrollView>
  );
};

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontFamily: theme.fonts.bold,
      fontSize: 22,
      textAlign: 'center',
      paddingBottom: 20,
      color: theme.colors.textPrimary,
    },
    container: {
      width: '100%',
      height: 200,
      backgroundColor: theme.colors.btnDisabled,
      padding: 20,
      alignSelf: 'center',
      paddingBottom: 50,
      borderRadius: 30,
      // opacity: 0.7,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });

export default Home;
