import React, { useState } from 'react';

import mime from 'mime';
import { UploadPhotoStyle, UploadPhotoText } from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
//import { setScheduleStreamUrlImage } from '../../Redux/Slices/scheduleSlice';
//import { useDispatch, useSelector } from 'react-redux';
//import { RootState } from '../../Redux/store';
import ContextMenu from 'react-native-context-menu-view';
import { Icon } from '@components/Icon';
import { ThemeContext, useTheme, useThemedStyles } from '@core/theme';
import UploadMenu from './function';

export interface ImageProp {
  uri: string;
  type: any;
  name: string | undefined;
}

export interface UploadPhotoProps {
  image: ImageProp | undefined;
  setImage: (a: ImageProp) => void;
  uploadImage: (a: ImageProp) => void;
}

export const UploadPhoto: React.FC<UploadPhotoProps> = ({
  image,
  setImage,
  uploadImage,
}) => {
  const style = useThemedStyles(styles);
  const { width } = useWindowDimensions();

  const handleOption = async (e: any) => {
    if (e.nativeEvent.name === 'Gallery') {
      await onUploadPhoto();
    } else {
      await onUploadCameraPhoto();
    }
  };

  const onUploadCameraPhoto = async () => {
    const result = await ImagePicker.openCamera({
      cropping: true,
      width: 300,
      height: 300,
      cropperCircleOverlay: true,
    });
    if (result) {
      const newImageUri = 'file:///' + result.path.split('file:/').join('');

      const photo = {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop(),
      };
      console.log('result: ' + JSON.stringify(result));
      //  dispatch(setScheduleStreamUrlImage(photo));
      setImage(photo);
      uploadImage(photo);
    }
  };

  const onUploadPhoto = async () => {
    const result = await ImagePicker.openPicker({
      multiple: false,
      cropping: true,
      width: 300,
      height: 300,
      cropperCircleOverlay: true,
    });
    if (result) {
      const newImageUri = 'file:///' + result.path.split('file:/').join('');

      const photo = {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop(),
      };
      // dispatch(setScheduleStreamUrlImage(photo));
      setImage(photo);
      uploadImage(photo);
    }
  };
  const { theme } = useTheme();
  return (
    <>
      <UploadPhotoStyle theme={theme}>
        {image ? (
          <Image
            source={{ uri: image.uri, width: 300, height: 300 }}
            style={{ width: 80, height: 80, borderRadius: 100 }}
          />
        ) : (
          <UploadPhotoText>Upload Photo</UploadPhotoText>
        )}
      </UploadPhotoStyle>
      <View style={[style.cameraIconWrapper, { left: width / 2 - 20 }]}>
          <UploadMenu setImage={setImage} uploadImage={uploadImage} />
      </View>
    </>
  );
};

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
      paddingHorizontal: 38,
    },
    avatarWrapper: {
      alignItems: 'center',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: theme.colors.accent,
    },
    emptyAvatar: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
      height: 80,
      borderRadius: 50,
      backgroundColor: theme.colors.accent,
    },
    cameraIconWrapper: {
      width: 35,
      height: 35,
      borderRadius: 50,
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.colors.white,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      justifyContent: 'center',
      alignItems: 'center',
    },
    houseIcon: {
      color: theme.colors.accent,
    },
    nameInitials: {
      fontFamily: theme.fonts.bold,
      fontSize: 24,
      color: theme.colors.white,
      textTransform: 'uppercase',
    },
    name: {
      marginTop: 5,
      fontFamily: theme.fonts.bold,
      fontSize: 20,
      color: theme.colors.textSeptuary,
      textAlign: 'center',
    },
    locationWrapper: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    editLocationIcon: {
      color: theme.colors.accent,
    },
    chipsContainer: {
      flexDirection: 'row',
      maxHeight: 80,
      flexWrap: 'wrap',
    },
  });
