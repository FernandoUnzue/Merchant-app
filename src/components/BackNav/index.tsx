import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ArrowLeftBack from '@core/theme/SVGS/ArrowLeftBack';
import { ThemeContext, useTheme } from '@core/theme';
import BackArrowIcon from '@core/theme/Merchant/BackArrow';

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
  text = false,
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
      <TouchableOpacity
        onPress={OnPress ? () => OnPress() : () => navigation.goBack()}
        hitSlop={20}>
        <View style={{ flexDirection: 'row' }}>
          <BackArrowIcon
            size={35}
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
      </TouchableOpacity>
    </View>
  );
};

export default BackNav;

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    main: {},
  });
