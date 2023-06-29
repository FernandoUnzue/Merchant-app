import { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { useLoginContainer } from '@modules/unlogged/hooks';
import { UnloggedStackParamList } from '@modules/unlogged';
import { Button } from '@components/Button';
import { LoginFooter } from '@components/LoginFooter';
import { Spacer } from '@components/Spacer';
import { Modal } from '@components/Modal';

/**
 * Types
 */

type TermsAndConditionsScreenProps = StackScreenProps<
  UnloggedStackParamList,
  'PasswordError'
>;

/**
 * Constants
 */

const tyc = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

/**
 * TermsAndConditions Screen
 */

export const TermsAndConditions: FC<TermsAndConditionsScreenProps> = ({
  navigation: { goBack },
}) => {
  const style = useThemedStyles(styles);
  const { container } = useLoginContainer();

  return (
    <>
      <Modal>
        <Spacer height={'2%'} />
        <Text style={style.title}>CONDIZIONI DI UTILIZZO DEL SERVIZIO</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Spacer height={2} />
          <Text style={style.text} textBreakStrategy="balanced">
            {tyc}
          </Text>
        </ScrollView>
        <Spacer />
        <Button
          accessibilityLabel="ho capito"
          title="ho capito"
          type="secondary"
          onPress={goBack}
        />
        <Spacer height={'3%'} />
      </Modal>
      <View style={[style.container, container]} />
      <LoginFooter />
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
      fontSize: 14,
      color: theme.colors.text,
    },
    text: {
      textAlign: 'justify',
    },
  });
