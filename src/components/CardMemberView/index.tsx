import { ImageBackground, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import ModalNew from '@components/ModalNew/ModalNew';
import CloseIcon from '@core/theme/SVGS/CloseX';
import Barcode from 'react-native-barcode-builder';

type Props = {
    modalShow: boolean;
    closeModal: ()=> void;
    cardNumber: string | undefined;
}

const CardMember: React.FC<Props> = ({modalShow, closeModal, cardNumber}) => {
    const { height: windowHeigth, width: windowWidth } = useWindowDimensions();
  return (
    <ModalNew
    modalShow={modalShow}
    closeModal={closeModal}
    // overlayColor={Colors.accent}
    styles={{
      borderRadius: 20,
      padding: 10,
    }}
    width={windowWidth}
    height={'90%'}>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '100%',
        maxWidth: '100%',
      }}>
      <View
        style={{
          borderRadius: 20,
          maxHeight: '100%',
          maxWidth: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            flexDirection: 'row',
          }}>
          <Pressable onPress={() => closeModal()} hitSlop={15}>
            <Text style={{ fontSize: 22, color: '#000' }}><CloseIcon size={20} /></Text>
          </Pressable>
        </View>
        <ImageBackground
          source={require('../../../assets/images/CardNew.png')}
          style={{
            height: '90%',
            width: '100%',
            maxWidth: '100%',
            maxHeight: '93%',
            position: 'relative', // because it's parent
            bottom: '1%',
            right: '50%',
          }}>
          <View
            style={{
              position: 'absolute', // child
              top: '17%', // position where you want
              left: '5%',
              backgroundColor: '#fff',
              transform: [{ rotate: '90deg' }],
            }}>
            <Barcode
              value={cardNumber ? cardNumber : ''}
              format="CODE128"
              text={cardNumber}
              height={50}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  </ModalNew>
  )
}

export default CardMember

const styles = StyleSheet.create({})