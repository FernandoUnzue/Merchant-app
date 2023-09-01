// Barcode and QR Code Scanner using Camera in React Native
// https://aboutreact.com/react-native-scan-qr-code/

// import React in our code
import BackNav from '@components/BackNav';
import { Button } from '@components/Button';
import ButtonFlat from '@components/ButtonFlat';
import { ColorsGeneralDark } from '@core/theme';
import { LoggedStackParamList } from '@modules/logged';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';

// import CameraScreen
import { CameraScreen } from 'react-native-camera-kit';

/**
 * Types
 */

type CameraScannerScreenProps = StackScreenProps<
  LoggedStackParamList,
  'CameraScannerScreen'
>;

const CameraScannerScreen: React.FC<CameraScannerScreenProps> = ({
  navigation,
  route,
}) => {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);

  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = (qrvalue: any) => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);

    //  setOpneScanner(false);
  };

  const onOpneScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
              buttonPositive: 'btton positive',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
            setOpneScanner(true);
          } else {
            Alert.alert('CAMERA permission denied');
          }
        } catch (err: any) {
          Alert.alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpneScanner(true);
    }
  };
  useEffect(() => {
    onOpneScanner();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <BackNav navigation={navigation} text={false} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={styles.textStyle}>
            {qrvalue ? 'Scanned Result: ' + qrvalue : ''}
          </Text>
          <View
            style={{
              width: 100,
              paddingVertical: 10,
              alignSelf: 'center',
            }}>
            <ButtonFlat
              title="TAKE"
              widthButton={83}
              heightButton={50}
              fontSize={14}
              styless={{
                borderRadius: 150,
              }}
              textStyles={{
                color: 'white',
              }}
              color={ColorsGeneralDark.background}
              onPress={() =>
                navigation.push('HomeBurnCoupon', { qrfound: qrvalue })
              }
            />
          </View>
        </View>
        <CameraScreen
          showFrame={false}
          // Show/hide scan frame
          scanBarcode={true}
          // Can restrict for the QR Code only
          laserColor={'blue'}
          // Color can be of your choice
          frameColor={'green'}
          // If frame is visible then frame color
          //   colorForScannerFrame={'black'}
          // Scanner Frame color
          onReadCode={event => onBarcodeScan(event.nativeEvent.codeStringValue)}
          cameraRatioOverlay={undefined}
          captureButtonImage={undefined}
          captureButtonImageStyle={{}}
          cameraFlipImage={undefined}
          cameraFlipImageStyle={{}}
          hideControls={undefined}
          torchOnImage={undefined}
          torchOffImage={undefined}
          torchImageStyle={{}}
          onBottomButtonPressed={() => null}
        />
      </View>
    </SafeAreaView>
  );
};

export default CameraScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
});
