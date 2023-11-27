import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import ModalNew from '@components/ModalNew/ModalNew';
import { Colors, ColorsGeneralDark, Fonts } from '@core/theme';
import { Button } from '@components/Button';
import { Spacer } from '@components/Spacer';
import { useSelector } from 'react-redux';
import { RootState } from '@core/redux/store';

type Props = {
  show: boolean;
  closeModal: () => void;
  onPressConfirm: () => void;
  width?: number;
  height?: number;
  message: string;
  loading?: boolean;
  backgroundColor?: string;
};

const ModalAsk: React.FC<Props> = ({
  show,
  closeModal,
  onPressConfirm,
  width,
  loading,
  height,
  message,
  backgroundColor,
}) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = useSelector((state: RootState) => state.auth.darkMode);
  return (
    <ModalNew
      modalShow={show}
      closeModal={closeModal}
      close={true}
      // overlayColor={Colors.accent}
      styles={{
        borderRadius: 20,
        padding: 20,
      }}
      backColor={
        isDarkTheme || colorScheme === 'dark'
          ? ColorsGeneralDark.background
          : ColorsGeneralDark.backgroundNegative
      }
      closeColor={isDarkTheme || colorScheme === 'dark' ? '#fff' : '#000'}
      width={width}
      height={height}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: height,
        }}>
        <View
          style={{
            borderRadius: 20,
            padding: 20,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:
              isDarkTheme || colorScheme === 'dark'
                ? ColorsGeneralDark.background
                : ColorsGeneralDark.backgroundNegative,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontFamily: Fonts.bold,
              textAlign: 'center',
              fontSize: 16,
              color:
                isDarkTheme || colorScheme === 'dark'
                  ? Colors.white
                  : Colors.black,
              paddingBottom: 12,
            }}>
            {message}
          </Text>
          <Button
            accessibilityLabel="Conferma"
            title="Conferma"
            type="primary"
            onPress={() => {
              onPressConfirm();
              closeModal();
            }}
            loading={loading ? loading : false}
          />
          <Spacer height={10} />
          <Button
            accessibilityLabel="Cancella"
            title="Cancella"
            type="tertiary"
            onPress={() => closeModal()}
            disabled={loading ? loading : false}
          />
        </View>
      </View>
    </ModalNew>
  );
};

export default ModalAsk;

const styles = StyleSheet.create({});
