import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { DeleteUltimoMovParamList, UltimoMovParamList } from '@modules/logged';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { Spacer } from '@components/Spacer';
import DeleteXIcon from '@core/theme/SVGS/DeleteX';
import { useForm } from 'react-hook-form';
import { FormInput } from '@components/FormInput';
import { Button } from '@components/Button';
import { useCancelLastMovementMutation } from '@core/redux/Api/endpoints/Webpos';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';

/**
 * Types
 */

type ConfirmScreenDeleteUltimoMovProps = StackScreenProps<
  DeleteUltimoMovParamList,
  'DeleteConfirmScreen'
>;

const ConfirmDeleteMovScreen: React.FC<ConfirmScreenDeleteUltimoMovProps> = ({
  route,
  navigation,
}) => {
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
      .then(() => {
        navigation.navigate('DeleteMovSuccess');
      })
      .catch(error => {
        // console.log(JSON.stringify(error));
        navigation.navigate('DeleteMovError', { errorMessage: error.message });
      });
  };

  return (
    <ScrollView style={style.main}>
      <Text style={style.title}>Elimina movimento</Text>
      <Spacer height={50} />
      <View style={style.container}>
        <DeleteXIcon size={50} styles={{ alignSelf: 'center' }} />
        <Spacer height={30} />
        <Text style={style.subtitle}>ELIMINA</Text>
        <Spacer height={10} />
        <Text style={style.text}>Confermi l’eliminazione del movimento?</Text>
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
          onPress={() => funcCancel()}
          accessibilityLabel="conferma"
          type="primary"
          disabled={!isDirty || !isValid}
          loading={isLoading}
        />
        <Spacer height={10} />
        <Button
          title="ANULLA"
          onPress={() => navigation.goBack()}
          accessibilityLabel="anulla"
          type="tertiary"
        />
      </View>
    </ScrollView>
  );
};

export default ConfirmDeleteMovScreen;

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
