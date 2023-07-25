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
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        padding: 20,
      }}>
      <BackNav navigation={navigation} />
      <View style={style.container}>
        <FormInput
          control={control}
          name={'search'}
          placeholder="NUMERO CARD"
          styless={{
            backgroundColor: 'transparent',
          }}
          showIcons={false}
        />
        <Button
          accessibilityLabel="incerisi"
          title="INSERICI"
          type="primary"
          onPress={() => navigation.navigate('SuccessBurnCouponScreen')}
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
    container: {
      width: '100%',
      height: 200,
      backgroundColor: theme.colors.btnDisabled,
      padding: 20,
      alignSelf: 'center',
      paddingBottom: 50,
      borderRadius: 30,
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
