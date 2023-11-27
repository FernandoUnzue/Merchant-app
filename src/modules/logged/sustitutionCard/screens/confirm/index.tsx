import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  DeleteUltimoMovParamList,
  SustitutionCardParamList,
  UltimoMovParamList,
} from '@modules/logged';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { Spacer } from '@components/Spacer';
import DeleteXIcon from '@core/theme/SVGS/DeleteX';
import { useForm } from 'react-hook-form';
import { FormInput } from '@components/FormInput';
import { Button } from '@components/Button';
import { useCancelLastMovementMutation } from '@core/redux/Api/endpoints/Webpos';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';
import SustitutionIcon from '@core/theme/SVGS/SustitutionIcon';

/**
 * Types
 */

type ConfirmScreenSustitutionCardProps = StackScreenProps<
  SustitutionCardParamList,
  'ConfirmSustitutionCardScreen'
>;

const ConfirmSustitutionCardScreen: React.FC<
  ConfirmScreenSustitutionCardProps
> = ({ route, navigation }) => {
  const style = useThemedStyles(styles);
  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'onChange',
  });

  const customer = useSelector((state: RootState) => state.customer);
  const notesValue: string = watch('motivo');

  const [cancelLastMovement, { isLoading }] = useCancelLastMovementMutation();

  const funcCancel = async () => {
    await cancelLastMovement({
      customerId: customer.userInfo
        ? customer.userInfo?.fnet_customer_id.toString()
        : '0',
      notes: notesValue,
    })
      .unwrap()
      .then(() => {})
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  };

  return (
    <ScrollView style={style.main}>
      <Text style={style.title}>Sostituisci card</Text>
      <Spacer height={50} />
      <View style={style.container}>
        <SustitutionIcon size={50} styles={{ alignSelf: 'center' }} />
        <Spacer height={30} />
        <Text style={style.subtitle}>SOSTITUISCI</Text>
        <Spacer height={10} />
        <Text style={style.text}>Confermi la sostituzione della card</Text>
        <Spacer height={30} />
        <Text>Aggiungi nota (consigliata)</Text>
        <Spacer height={10} />
        <FormInput
          control={control}
          name={'motivo'}
          multiline
          numberOfLines={2}
          styless={{
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: '#fff',
            height: 70,
            padding: 5,
          }}
          rules={{
            required: true,
            minLength: 4,
          }}
        />
        <Button
          title="CONFERMA"
          onPress={() =>
            navigation.navigate('SuccessSustitutionCardScreen', {
              message: 'Error 423423',
            })
          }
          accessibilityLabel="conferma"
          type="primary"
          disabled={!isDirty || !isValid}
          loading={isLoading}
        />
        <Spacer height={10} />
        <Button
          title="ANNULLA"
          onPress={() => navigation.goBack()}
          accessibilityLabel="anulla"
          type="tertiary"
        />
      </View>
    </ScrollView>
  );
};

export default ConfirmSustitutionCardScreen;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {
      maxHeight: 1200,
      padding: 20,
      backgroundColor: theme.colors.background,
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
