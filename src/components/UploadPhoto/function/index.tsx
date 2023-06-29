import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ContextMenu from 'react-native-context-menu-view';
import { Icon } from '@components/Icon';
import ImagePicker from 'react-native-image-crop-picker';
import mime from 'mime';
import { ImageProp } from '..';

export interface UploadPhotoProps {
  setImage: (a: ImageProp) => void;
  uploadImage: (a: ImageProp) => void;
}

const UploadMenu: React.FC<UploadPhotoProps> = ({ setImage, uploadImage }) => {
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
  return (
    <ContextMenu
      actions={[{ title: 'Camera' }, { title: 'Gallery' }]}
      dropdownMenuMode={true}
      onPress={e => {
        handleOption(e);
        console.log(
          `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`,
        );
      }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      <Icon name="Camera" size={25} />
    </ContextMenu>
  );
};

export default UploadMenu;
