// Barcode and QR Code Scanner using Camera in React Native
// https://aboutreact.com/react-native-scan-qr-code/

// import React in our code
import BackNav from '@components/BackNav';
import { Button } from '@components/Button';
import ButtonFlat from '@components/ButtonFlat';
import { RootState } from '@core/redux/store';
import {
  ColorsGeneralDark,
  ColorsGeneralLight,
  generalColorsNew,
  themeContent,
  ThemeContext,
  useThemedStyles,
} from '@core/theme';
import {
  LoggedStackParamList,
  MemberCardStackParamList,
} from '@modules/logged';
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
  useColorScheme,
} from 'react-native';

// import CameraScreen
import { CameraScreen } from 'react-native-camera-kit';
import { useSelector } from 'react-redux';

/**
 * Types
 */

type CameraScannerScreenProps = StackScreenProps<
  MemberCardStackParamList,
  'CameraScannerScreen'
>;

const CameraScannerScreenCard: React.FC<CameraScannerScreenProps> = ({
  navigation,
  route,
}) => {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);

  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };
  const style = useThemedStyles(styles);
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
  const isDarkTheme = useSelector((state: RootState) => state.auth.darkMode);
  const colorScheme = useColorScheme();
  useEffect(() => {
    onOpneScanner();
  }, []);

  return (
    <SafeAreaView style={style.safeAreaStyle}>
      <View style={style.subcontainer}>
        <BackNav navigation={navigation} text={false} />
        <View style={style.square}>
          <Text style={style.textStyle}>
            {qrvalue ? 'Scanned Result: ' + qrvalue : ''}
          </Text>
          <View
            style={{
              width: 100,
              paddingVertical: 10,
              alignSelf: 'center',
            }}>
            <ButtonFlat
              title="OK"
              widthButton={65}
              heightButton={50}
              fontSize={14}
              styless={{
                borderRadius: 150,
              }}
              textStyles={{
                color: isDarkTheme || colorScheme === 'dark' ? '#000' : 'white',
              }}
              color={generalColorsNew.accent}
              onPress={() =>
                navigation.push('MemberCardHome', { qrfound: qrvalue })
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

export default CameraScannerScreenCard;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    safeAreaStyle: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    subcontainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 10,
      alignItems: 'center',
    },
    square: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    titleText: {
      fontSize: 22,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    textStyle: {
      color: 'black',
      fontSize: 14,
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
