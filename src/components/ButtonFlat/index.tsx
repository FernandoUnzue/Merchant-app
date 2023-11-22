import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { ReactNode } from 'react';
import { Colors, ThemeContext, useThemedStyles } from '@core/theme';

type Props = {
  color?: string;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  title: string;
  widthButton?: number | string;
  onPress: () => void;
  styless?: ViewStyle;
  fontSize?: number;
  heightButton?: number;
  disable?: boolean;
  loading?: boolean;
  textStyles?: TextStyle;
};

const ButtonFlat: React.FC<Props> = ({
  color,
  loading,
  styless,
  disable = false,
  textStyles,
  heightButton,
  fontSize,
  iconLeft,
  iconRight,
  title,
  widthButton,
  onPress,
}) => {
  const style = useThemedStyles(styles);
  return (
    <TouchableOpacity onPress={onPress} disabled={disable}>
      <View
        style={[
          !disable
            ? {
                ...style.container,
                width: widthButton ? widthButton : '100%',
                backgroundColor: color ? color : Colors.accent,
                height: heightButton ? heightButton : 60,
                ...styless,
              }
            : {
                ...style.container,
                width: widthButton ? widthButton : '100%',
                backgroundColor: Colors.btnDisabled,
                height: heightButton ? heightButton : 60,
                ...styless,
              },
        ]}>
        {iconLeft && <View style={style.startCont}>{iconLeft}</View>}
        <View style={{ width: '85%' }}>
          {loading ? (
            <ActivityIndicator size={'large'} color="#fff" />
          ) : (
            <Text
              style={{
                ...style.title,
                fontSize: fontSize ? fontSize : 18,
                color: disable ? Colors.textDisabled : '#000',
                ...textStyles,
              }}>
              {title}
            </Text>
          )}
        </View>
        {iconRight && <View style={style.endCont}>{iconRight}</View>}
      </View>
    </TouchableOpacity>
  );
};

export default ButtonFlat;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      height: 60,
      paddingVertical: 15,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    textCont: {},
    btnDisabled: {
      backgroundColor: '#C6C6C6',
    },
    textDisabled: {
      color: theme.colors.textDisabled,
    },
    title: {
      fontSize: 18,
      fontFamily: theme.fonts.bold,
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    rowContent: {
      flexDirection: 'row',
    },
    endCont: {
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
      width: '12%',
      marginBottom: 5,
    },
    startCont: {
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
      width: '12%',
    },
  });
