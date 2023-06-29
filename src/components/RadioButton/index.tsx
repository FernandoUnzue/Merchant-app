import { FC } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { ThemeContext, useThemedStyles } from '@core/theme';

/**
 * Types
 */

type RadioButtonProps = {
  data: { key: string; value: string }[];
  selectedKey: string;
  onSelect: (key: string) => void;
};

/**
 * RadioButton
 */

export const RadioButton: FC<RadioButtonProps> = ({
  data,
  selectedKey,
  onSelect,
}) => {
  const style = useThemedStyles(styles);

  return (
    <View style={style.container}>
      {data.map(({ key, value }) => (
        <Pressable
          key={key}
          style={[
            style.itemNonSelected,
            key === selectedKey && style.itemSelected,
          ]}
          onPress={() => onSelect(key)}>
          <Text style={[style.text, key === 'X' && style.xGenderText]}>
            {value}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 50,
    },
    itemNonSelected: {
      borderRadius: 50,
      height: 24,
      width: 24,
      marginRight: 10,
      backgroundColor: theme.colors.textDisabledSecondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemSelected: {
      backgroundColor: theme.colors.accent,
    },
    text: {
      fontSize: 11,
      fontFamily: theme.fonts.bold,
      color: theme.colors.textSeptuary,
      padding: 4,
    },
    xGenderText: {
      fontSize: 16,
      paddingTop: Platform.OS === 'android' ? -8 : 2,
    },
  });
