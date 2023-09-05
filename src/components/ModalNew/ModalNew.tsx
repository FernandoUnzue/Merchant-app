import CloseIcon from '@core/theme/SVGS/CloseX';
import React from 'react';
import { DimensionValue, Pressable, Text, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';

type Props = {
  closeModal: () => void;
  modalShow: boolean;
  children: React.ReactNode;
  styles?: ViewStyle;
  overlayColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  backColor?: string;
  close?: boolean;
  closeColor?: string;
};

const ModalNew: React.FC<Props> = ({
  closeModal,
  modalShow,
  children,
  styles,
  width = 300,
  height = 150,
  overlayColor,
  backColor = '#fff',
  closeColor = '#000',
  close = false,
}: Props) => {
  return (
    <Modal
      isVisible={modalShow}
      onBackdropPress={closeModal}
      backdropColor={overlayColor}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            ...styles,
            width,
            height,
            backgroundColor: backColor ? backColor : '#fff',
          }}>
          {close && (
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                flexDirection: 'row',
                paddingBottom: 20,
              }}>
              <Pressable onPress={() => closeModal()} hitSlop={35}>
                <CloseIcon size={20} color={closeColor} />
              </Pressable>
            </View>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalNew;
