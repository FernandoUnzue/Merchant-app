import { FC } from 'react';
import { Image, StyleSheet, Text } from 'react-native';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { Slide } from '@modules/unlogged/presentation';
import { isSmallDevice } from '@core/helpers';

/**
 * Types
 */

type PresentationCarouselItemProps = {
  item: Slide;
  height: number;
};

/**
 * PresentationCarouselItem
 */

export const PresentationCarouselItem: FC<PresentationCarouselItemProps> = ({
  item: { title, image },
  height,
}) => {
  const style = useThemedStyles(styles);

  return (
    <>
      <Image
        source={image}
        resizeMode="contain"
        style={[style.image, { height }]}
      />
      <Text style={style.text}>{title}</Text>
    </>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    image: {
      width: '100%',
      marginBottom: isSmallDevice() ? 5 : 45,
    },
    text: {
      paddingBottom: isSmallDevice() ? 40 : 10,
      paddingHorizontal: 45,
      fontFamily: theme.fonts.bold,
      fontSize: 22,
      color: theme.colors.black,
      textAlign: 'center',
    },
  });
