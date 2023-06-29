import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ErrorImageIcon from '@core/theme/SVGS/ErrorImage';
import { ThemeContext, useThemedStyles } from '@core/theme';
import BackNav from '@components/BackNav';

type Props = {
    navigation: any;
}
const NotFoundView: React.FC<Props> = ({navigation}) => {
  const style = useThemedStyles(styles);
  return (
    <View style={style.container}>
        <BackNav navigation={navigation} />
        <View style={style.subcontainer}>
            <Text style={style.text}>Coming soon</Text>
            <ErrorImageIcon size={200} />
      </View>
    </View>
  )
}

export default NotFoundView

const styles = ({ theme }: ThemeContext) =>
    StyleSheet.create({
        container:{
            flex: 1,
            padding: 20,
            backgroundColor: theme.colors.white
        },
        subcontainer:{
            flex: 1,
            justifyContent: 'center', 
            alignItems: 'center'
        },
        text:{
            fontSize: 22,
            fontFamily: theme.fonts.bold
        }
    });