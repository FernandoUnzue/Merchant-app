import { Button } from '@components/Button';
import ModalNew from '@components/ModalNew/ModalNew';
import { AuthSlice } from '@core/redux/authSlice/authSlice';
import { AppDispatch } from '@core/redux/store';
import { Fonts } from '@core/theme';
import React from 'react';
import { Platform, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

type Props = {
  show: boolean;
};

export const ModalToken: React.FC<Props> = ({ show }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <ModalNew
      modalShow={show}
      closeModal={() => dispatch(AuthSlice.actions.closeModal())}
      width={300}
      height={200}
      styles={{
        borderRadius: 20,
        paddingVertical: 30,
      }}>
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: '#000',
            fontSize: 16,
            paddingBottom: 20,
          }}>
          La tua sessione è scaduta. Per favore accedi di nuovo
        </Text>
        <Button
          title="OK"
          accessibilityLabel="OK"
          onPress={() => dispatch(AuthSlice.actions.closeModal())}
          type="quaternary"
        />
      </View>
    </ModalNew>
  );
};

export default ModalToken;
