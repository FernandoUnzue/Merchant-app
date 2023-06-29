import { FC, useCallback, useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { useLoginContainer } from '@modules/unlogged/hooks';
import { useDisableGoBack } from '@core/hooks';
import { UnloggedStackParamList } from '@modules/unlogged';
import { Button } from '@components/Button';
import { LoginFooter } from '@components/LoginFooter';
import { Spacer } from '@components/Spacer';
import { Modal } from '@components/Modal';
import { DateInput } from '@components/DateInput';
import { FormInput } from '@components/FormInput';
import { SelectInput } from '@components/SelectInput';
import { Checkbox } from '@components/Checkbox';
import {
  ALPHABETIC_REGEX,
  EMAIL_REGEX,
  ITALY_DATE_FORMAT,
} from '@core/constants';
import axiosInstance from '@core/clients/axios';
import dayjs from '@core/helpers/dayjs';
import { Api } from '@core/clients/axioss';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalDataSchema } from '@core/helpers/utils';
import moment from 'moment';

/**
 * Types
 */

type RegisterPersonalDataScreenProps = StackScreenProps<
  UnloggedStackParamList,
  'RegisterPersonalData'
>;

export type PersonalData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  rEmail: string;
  birthDate?: Date;
  province: number | null;
  privacyThirdPartner: boolean;
  privacyMkt: boolean;
  privacyAnalysisData: boolean;
  provinceCode: string;
};

/**
 * Constants
 */

const DEFAULT_VALUES: PersonalData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  rEmail: '',
  birthDate: undefined,
  province: null,
  privacyThirdPartner: false,
  privacyMkt: false,
  privacyAnalysisData: false,
  provinceCode: '',
};

/**
 * RegisterPersonalData Screen
 */

export const RegisterPersonalData: FC<RegisterPersonalDataScreenProps> = ({
  navigation: { navigate },
  route: {
    params: { phone },
  },
}) => {
  useDisableGoBack();
  const [loading, setLoading] = useState(false);
  const style = useThemedStyles(styles);
  const { container } = useLoginContainer();
  const [provinces, setProvinces] = useState<
    { id: number; initials: string; province: string }[]
  >([]);

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { isDirty, isValid },
  } = useForm<PersonalData>({
    mode: 'onChange',
    defaultValues: { ...DEFAULT_VALUES, phone },
    //resolver: yupResolver(personalDataSchema)
  });
  const emailValue = watch('email');
  const birthDayValue = watch('birthDate');

  const isChecked = (value: boolean) => !!value;

  const onSubmitPressed = async ({
    firstName,
    lastName,
    email,
    birthDate,
    province,
    privacyThirdPartner,
    privacyMkt,
    privacyAnalysisData,
    provinceCode,
  }: PersonalData) => {
    setLoading(true);

    console.log({
      firstName,
      lastName,
      phoneNumber: phone,
      email,
      birthDate: dayjs(birthDate).format(ITALY_DATE_FORMAT).toString(),
      capId: province,
      privacyThirdPartner: privacyThirdPartner ? 1 : 0,
      privacyMkt: privacyMkt ? 1 : 0,
      privacyAnalysisData: privacyAnalysisData ? 1 : 0,
    });

    try {
      const response = await Api({
        endpoint: '/api/register/update',
        method: 'POST',
        _data: {
          firstName,
          lastName,
          phoneNumber: phone,
          email,
          birthDate: dayjs(birthDate).format(ITALY_DATE_FORMAT).toString(),
          capId: 1,
          privacyThirdPartner: privacyThirdPartner ? 1 : 0,
          privacyMkt: privacyMkt ? 1 : 0,
          privacyAnalysisData: privacyAnalysisData ? 1 : 0,
          provinceCode,
        },
      });
      setLoading(false);
      const { card } = response.data;

      if (card) {
        navigate('EmailValidation', { phone, cardNumber: card, email });
      } else {
        console.log(response);
        Alert.alert('Errore', 'Qualcosa è accaduto. Riprova');
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      Alert.alert('Errore', 'Qualcosa è accaduto. Riprova');
    }
  };

  const getProvinces = async () => {
    try {
      const resp = await Api({
        endpoint: '/province/list',
      });
      if (resp.status === 200) {
        console.log('success provinces');
        setProvinces(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [error, setError] = useState<boolean>(false);

  const validateAge = useCallback(() => {
    if (
      moment(watch('birthDate')).unix() <= moment().subtract(18, 'years').unix()
    ) {
      setError(false);
    } else {
      setError(true);
    }
  }, []);

  useEffect(() => {
    getProvinces();
  }, []);
  useEffect(() => {
    trigger('rEmail');
  }, [emailValue]);

  useEffect(() => {
    if (birthDayValue) {
      validateAge();
      //  validateAgeMinor100();
      trigger('birthDate');
    }
  }, [birthDayValue]);

  return (
    <>
      <View style={[style.container, container]} />
      <LoginFooter />

      <Modal>
        <View>
          <Text style={style.title}>INIZIA A RISPARMIARE ORA</Text>
          <Text style={style.subtitle}>
            Compila il form per generare la tua card
          </Text>
        </View>

        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          keyboardOpeningTime={0}
          enableResetScrollToCoords={true}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          bouncesZoom={false}
          bounces={false}
          enableAutomaticScroll={true}>
          <FormInput
            name="firstName"
            placeholder="Nome*"
            autoCapitalize="words"
            control={control}
            rules={{
              required: true,
              pattern: ALPHABETIC_REGEX,
            }}
          />
          <FormInput
            name="lastName"
            placeholder="Cognome*"
            autoCapitalize="words"
            control={control}
            rules={{
              required: true,
              pattern: ALPHABETIC_REGEX,
            }}
          />
          <FormInput name="phone" control={control} fixed={true} />
          <FormInput
            name="email"
            placeholder="Email*"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            control={control}
            rules={{
              required: true,
              pattern: {
                value: EMAIL_REGEX,
                message: 'Formato mail non valido!',
              },
            }}
          />
          <FormInput
            name="rEmail"
            placeholder="Conferma Email*"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            disablePaste
            control={control}
            //  passValue={watch('email')}
            // confirmEmail={true}
            rules={{
              validate: (value: string) =>
                value === emailValue || 'Indirizzo mail non correspondente!',
            }}
          />
          <Spacer height={15} />

          <DateInput
            name="birthDate"
            placeholder="Data di nascita*"
            control={control}
            rules={{
              required: true,
              validate: () =>
                moment(watch('birthDate')).unix() <=
                moment().subtract(18, 'years').unix(),
            }}
            error={error}
            errorMessage={'Sei minorenne'}
            minDate={moment()
              .subtract(100, 'years')
              .format('YYYY-MM-DD')
              .toString()}
            defaultDate={moment().format('YYYY-MM-DD').toString()}
          />
          <Spacer height={Platform.OS === 'android' ? 30 : 36} />

          <SelectInput
            name="provinceCode"
            placeholder="Provincia di domicilio*"
            control={control}
            rules={{ required: true }}
            data={provinces.map(pr => {
              return { label: pr.province, value: pr.initials };
            })}
          />

          <Spacer height={30} />
          <Text style={style.privacyTitle}>TERMINI PRIVACY E CONDIZIONI</Text>
          <Spacer height={18} />

          <View style={style.privacyWrapper}>
            <View style={style.checkboxWrapper}>
              <Checkbox
                name="privacyThirdPartner"
                control={control}
                rules={{
                  required: true,
                  validate: isChecked,
                }}
              />
            </View>
            <Text style={style.privacyTextWrapper}>
              <Text style={style.privacyText}>
                *Ho letto, compreso ed accetto i{' '}
              </Text>
              <Text
                style={style.privacyLinkedText}
                suppressHighlighting
                onPress={() => navigate('TermsAndConditions')}>
                termini e le condizioni Privacy
              </Text>
            </Text>
          </View>

          <Spacer height={8} />

          <View style={style.privacyWrapper}>
            <View style={style.checkboxWrapper}>
              <Checkbox name="privacyMkt" control={control} />
            </View>
            <View style={style.privacyTextWrapper}>
              <Text style={style.privacyText}>Utilizzo dati per Marketing</Text>
            </View>
          </View>

          <Spacer height={8} />

          <View style={style.privacyWrapper}>
            <View style={style.checkboxWrapper}>
              <Checkbox name="privacyAnalysisData" control={control} />
            </View>
            <View style={style.privacyTextWrapper}>
              <Text style={style.privacyText}>Profilazione</Text>
            </View>
          </View>
        </KeyboardAwareScrollView>

        <Spacer />
        <Button
          accessibilityLabel="procedi"
          title="procedi"
          type="secondary"
          loading={loading}
          disabled={!isDirty || !isValid}
          onPress={handleSubmit(onSubmitPressed)}
        />
        <Spacer height={'3%'} />
      </Modal>
    </>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontFamily: theme.fonts.bold,
      fontSize: 20,
      color: theme.colors.black,
      textAlign: 'center',
    },
    subtitle: {
      fontFamily: theme.fonts.regular,
      fontSize: 13,
      color: theme.colors.textQuaternary,
      textAlign: 'center',
    },
    text: {
      textAlign: 'justify',
    },
    privacyTitle: {
      fontFamily: theme.fonts.bold,
      fontSize: 15,
      color: theme.colors.text,
    },
    privacyWrapper: {
      flexDirection: 'row',
    },
    checkboxWrapper: {
      marginTop: 3,
    },
    privacyTextWrapper: {
      marginLeft: 8,
      paddingTop: 3,
      justifyContent: 'center',
    },
    privacyText: {
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      color: theme.colors.text,
      textAlignVertical: 'center',
    },
    privacyLinkedText: {
      fontFamily: theme.fonts.bold,
      fontSize: 10,
      color: theme.colors.accent,
    },
  });
