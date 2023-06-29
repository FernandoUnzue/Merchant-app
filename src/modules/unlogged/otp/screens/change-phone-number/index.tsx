import { FC } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'libphonenumber-js';

import { useDisableGoBack } from '@core/hooks';
import { ThemeContext, useThemedStyles } from '@core/theme';
import { useLoginContainer } from '@modules/unlogged/hooks';
import { FormInput } from '@components/FormInput';
import { LoginFooter } from '@components/LoginFooter';
import { WhiskeredButton } from '@components/WhiskeredButton';
import { UnloggedStackParamList } from '@modules/unlogged';
import { formatPhoneNumber } from '@modules/unlogged/helpers';

/**
 * Types
 */

type ChangePhoneNumberScreenProps = StackScreenProps<
  UnloggedStackParamList,
  'ChangePhoneNumber'
>;

export type NewPhone = {
  newPhone: string;
};

/**
 * Constants
 */

const DEFAULT_VALUES: NewPhone = {
  newPhone: '',
};

/**
 * ChangePhoneNumber Screen
 */

export const ChangePhoneNumber: FC<ChangePhoneNumberScreenProps> = ({
  navigation: { navigate },
  route: {
    params: { phone },
  },
}) => {
  useDisableGoBack();
  const style = useThemedStyles(styles);
  const { container } = useLoginContainer();
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<NewPhone>({
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });

  const validatePhoneNumber = (newPhone: string) => {
    const formattedNewPhone = formatPhoneNumber(newPhone);

    return phone !== formattedNewPhone && isValidPhoneNumber(formattedNewPhone);
  };

  const onChangePressed = (data: NewPhone) => {
    console.log('Button pressed');
    console.log({ data });
    console.log({ isValid });
    navigate('OTPValidation', { phone: data.newPhone, change: true });
  };

  return (
    <>
      <Pressable onPress={() => Keyboard.dismiss()} style={container}>
        <Text style={style.title}>Inserisci numero corretto</Text>
        <View style={style.formWrapper}>
          <FormInput
            name="newPhone"
            placeholder="Inserisci nuovo numero di cellulare*"
            control={control}
            rules={{
              required: true,
              validate: validatePhoneNumber,
            }}
            keyboardType="phone-pad"
          />
        </View>
      </Pressable>

      <LoginFooter>
        <WhiskeredButton
          accessibilityLabel="conferma"
          title="conferma"
          type="secondary"
          disabled={!isDirty || !isValid}
          onPress={handleSubmit(onChangePressed)}
        />
      </LoginFooter>
    </>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    formWrapper: {
      flexGrow: 1,
      paddingHorizontal: '20%',
      justifyContent: 'center',
    },
    title: {
      fontFamily: theme.fonts.bold,
      fontSize: 18,
      color: theme.colors.text,
      textAlign: 'center',
    },
  });
