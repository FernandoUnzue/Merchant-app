import { Pressable, StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { ReactNode, useEffect, useState } from 'react';
import DocumentPicker, { DocumentPickerResponse, types } from 'react-native-document-picker';
import UploadIcon from '@core/theme/SVGS/UploadIcon';
import { Colors, ThemeContext, useThemedStyles } from '@core/theme';
import CloseIcon from '@core/theme/SVGS/CloseX';

type Props = {
    title?: string;
    conditions?:string;
    typess?:'images'|'audio'|'pdf'|'plainText'| 'allFiles' [];
    icon?: ReactNode;
    color?: string;
    setFile: (a:any)=>void;
    reset: boolean;
}

const UploadFile: React.FC<Props> = ({title, conditions, reset, setFile, typess, icon, color}) => {
    let resetNew = reset;
    const [singleFile, setSingleFile] = useState<DocumentPickerResponse | null>(null);
    const style = useThemedStyles(styles);
    const selectFile = async () => {
        // Opening Document Picker to select one file
        try {
          const res = await DocumentPicker.pickSingle({
            // Provide which type of file you want user to pick
            type: [types.pdf, types.images],
            presentationStyle: 'fullScreen',
            // There can me more options as well
            // DocumentPicker.types.allFiles
            // DocumentPicker.types.images
            // DocumentPicker.types.plainText
            // DocumentPicker.types.audio
            // DocumentPicker.types.pdf
          });
          // Printing the log realted to the file
          // Alert.alert('res : ' + JSON.stringify(res));
          // Setting the state to show single file attributes
        //  const newImageUri = 'file:///' + res.uri.split('file:/').join('');
        if(res.size)
        if(res.size > 4194304){
          Alert.alert('the file exceed the max file size 4MB');
        }else{
        console.log('respuesta file')
          const file = {
            uri: res.uri,
            type: res.type,
            name: res.name,
            size: res.size,
            fileCopyUri: res.fileCopyUri,
          };
          setSingleFile(file);
          setFile(file);}
        } catch (err) {
          setSingleFile(null);
          setFile(null)
          // Handling any exception (If any)
          if (DocumentPicker.isCancel(err)) {
            // If user canceled the document selection
            console.log('Canceled');
          } else {
            // For Unknown Error
            console.log('Unknown Error: ' + JSON.stringify(err));
            throw err;
          }
        }
      };
      const [imageSize, setImageSize] = useState<{width: number, height: number}>()
      const ImageFull = (uri:string)=>{
        Image.getSize(uri, (width, height) => { 
         setImageSize({
          width,
          height
         })
        });
      }

      useEffect(()=>{
        if(resetNew){
          setSingleFile(null)
          resetNew = !resetNew;

        }
        if(singleFile && singleFile.type?.includes('image')){
            ImageFull(singleFile.uri)
        }
      },[singleFile, reset])

  return (
    <View style={style.container}>
        <Text style={style.textConditions}>{conditions ? conditions : 'Se hai una scansione della ricevuta, in formato PDF o JPG, aggiungila qui (Max 4MB)'}</Text>
      <Pressable onPress={()=> selectFile()} hitSlop={20}>
        <View style={{flexDirection:'row'}}>
           {icon ? icon : <UploadIcon size={20} styles={{marginRight: 10}} /> }
            <Text style={{...style.textGreen, color: color ? color : Colors.accent}}>{title ? title : 'Seleziona Allegato'}</Text>
        </View>
      </Pressable>
            {singleFile &&( <View style={{flexDirection:'row'}}> 
            <View>
            </View>
             {singleFile.type?.includes('image') && <Image source={{uri: singleFile.uri, width: imageSize?.width, height: imageSize?.height}} style={{ width:80, height: 50, resizeMode:'contain', aspectRatio: 2}} />}
                <Text numberOfLines={1} ellipsizeMode='head' style={{width: 200}}>Selected file:  <Text numberOfLines={1} ellipsizeMode='tail' style={{width: 50}}>{singleFile.name}</Text></Text> 
                <Pressable onPress={()=>setSingleFile(null)} hitSlop={20}><CloseIcon size={15} styles={{padding: 10}} /></Pressable>
                </View>)
                }
     
    </View>
  )
}

export default UploadFile

const styles = ({ theme }: ThemeContext) => 
StyleSheet.create({
textGreen:{
    color: theme.colors.accent
},
container:{
    //padding: 20
},
textConditions:{
    paddingVertical: 15
}
})