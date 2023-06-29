import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { useLoginContainer } from '@modules/unlogged/hooks';
import { UnloggedStackParamList } from '@modules/unlogged';
import { Card } from '@components/Card';
import { Button } from '@components/Button';
import { LoginFooter } from '@components/LoginFooter';
import { Spacer } from '@components/Spacer';
import { isSmallDevice } from '@core/helpers';

/**
 * Types
 */

type PasswordErrorScreenProps = StackScreenProps<
  UnloggedStackParamList,
  'PasswordError'
>;

/**
 * Constants
 */

const passwordRules = [
  'Non inferiore a 8 caratteri',
  'Almeno 1 lettera maiuscola',
  'Almeno 1 lettera minuscola',
  'Almeno 1 numero',
  'Almeno 1 carattere speciale',
  'Non deve essere mai uguale alle ultime 3 utilizzate precedentemente',
];

/**
 * PasswordError Screen
 */

export const PasswordError: FC<PasswordErrorScreenProps> = ({
  navigation: { navigate, goBack },
}) => {
  const style = useThemedStyles(styles);
  const { container } = useLoginContainer();

  return (
    <>
      <View style={[style.container, container]}>
        <Card>
          <Text style={style.title}>Regole creazione password</Text>
          <Spacer />
          {passwordRules.map((rule, index) => (
            <View key={index} style={style.rulesWrapper}>
              <Text style={style.star}>*</Text>
              <Text style={style.rule}>{rule}</Text>
            </View>
          ))}
          <Spacer height={'6%'} />
          <Button
            accessibilityLabel="prosegui"
            title="prosegui"
            type="secondary"
            onPress={goBack}
          />
        </Card>
      </View>

      <LoginFooter>
        <View style={style.textWrapper}>
          <Text style={style.registerWrapper}>
            <Text style={style.notRegistered}>Sei già registrato? </Text>
            <Text
              style={style.register}
              suppressHighlighting
              onPress={() => navigate('Login')}>
              Accedi
            </Text>
          </Text>
        </View>
      </LoginFooter>
    </>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      flexGrow: 1,
    },
    title: {
      fontFamily: theme.fonts.bold,
      fontSize: 16,
      color: theme.colors.text,
      textAlign: 'center',
    },
    rulesWrapper: {
      flexDirection: 'row',
    },
    star: {
      paddingTop: 6,
    },
    rule: {
      fontFamily: theme.fonts.regular,
      fontSize: 14,
      color: theme.colors.text,
      marginVertical: 5,
    },
    textWrapper: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    registerWrapper: {
      textAlign: 'center',
      marginBottom: isSmallDevice() ? '14%' : '20%',
    },
    notRegistered: {
      fontFamily: theme.fonts.regular,
      fontSize: 16,
      color: theme.colors.text,
    },
    register: {
      fontFamily: theme.fonts.bold,
      fontSize: 16,
      color: theme.colors.text,
    },
  });
