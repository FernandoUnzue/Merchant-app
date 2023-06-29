import { FC, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ThemeContext, useThemedStyles } from '@core/theme';

/**
 * Types
 */

type ChipTypes = 'add' | 'remove' | 'button';

interface ChipProps {
  type?: ChipTypes;
  text: string;
  active?: boolean;
  onPress: () => void;
}

export const Chip: FC<ChipProps> = ({ type, text, active, onPress }) => {
  const style = useThemedStyles(styles);
  const [buttonActive, setButtonActive] = useState<boolean>(false);
  return (
    <Pressable
      onPress={
        type === 'button'
          ? () => {
              setButtonActive(!buttonActive);
              onPress();
            }
          : () => onPress()
      }>
      <View
        style={
          active || buttonActive
            ? style.chipWrapperActive
            : style.chipWrapperNoActive
        }>
        <Text style={style.text} numberOfLines={1}>
          {text} {active ? 'X' : '+'}
        </Text>
      </View>
    </Pressable>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    chipWrapperActive: {
      height: 25,
      borderRadius: 25,
      paddingHorizontal: 10,
      margin: 5,
      backgroundColor: theme.colors.bgLoginFooter,
      justifyContent: 'center',
    },
    chipWrapperNoActive: {
      height: 25,
      borderRadius: 25,
      paddingHorizontal: 10,
      margin: 5,
      backgroundColor: '#D6D6D6',
      justifyContent: 'center',
    },
    text: {
      fontSize: 10,
      fontFamily: theme.fonts.regular,
      color: theme.colors.textOctuary,
    },
  });
