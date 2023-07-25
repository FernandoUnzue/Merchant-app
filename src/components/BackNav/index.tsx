import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ArrowLeftBack from '@core/theme/SVGS/ArrowLeftBack';
import { ThemeContext, useTheme } from '@core/theme';

type Props = {
  navigation: any;
  title?: string;
  text?: boolean;
  OnPress?: () => void;
};

const BackNav: React.FC<Props> = ({
  navigation,
  OnPress,
  title,
  text = true,
}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        justifyContent: 'flex-end',
        display: 'flex',
        alignItems: 'flex-end',
        paddingVertical: 10,
      }}>
      <Pressable
        onPress={OnPress ? () => OnPress() : () => navigation.goBack()}
        hitSlop={20}>
        <View style={{ flexDirection: 'row' }}>
          <ArrowLeftBack
            size={18}
            styles={{ marginRight: 5 }}
            color={theme.theme.colors.textPrimary}
          />
          {text && (
            <Text
              style={{ fontSize: 14, color: theme.theme.colors.textPrimary }}>
              {title ? title : 'Indietro'}
            </Text>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default BackNav;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {},
  });
