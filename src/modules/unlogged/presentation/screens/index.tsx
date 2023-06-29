import { FC, useState } from 'react';
import {
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import SnapCarousel, { Pagination } from 'react-native-snap-carousel';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { UnloggedStackParamList } from '@modules/unlogged';
import { Button } from '@components/Button';
import { LoginFooter } from '@components/LoginFooter';
import { PresentationCarouselItem } from '../components/PresentationCarouselItem';
import { Spacer } from '@components/Spacer';
import { isSmallDevice } from '@core/helpers';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * Types
 */

type PresentationScreenProps = StackScreenProps<
  UnloggedStackParamList,
  'Presentation'
>;

export type Slide = {
  title: string;
  image: ImageSourcePropType;
};

/**
 * Constants
 */

const INITIAL_INDEX = 0;
const INACTIVE_DOT_SCALE = 1;
const ASPECT_RATIO = 0.6246;

const baseDotStyle = {
  width: 18,
  height: 18,
  borderRadius: 25,
};

const slides: Slide[] = [
  {
    title: 'Inizia a fare shopping:\npiù acquisti, più risparmi!',
    image: require('../../../../../assets/images/slider-img-1.webp'),
  },
  {
    title: 'Un consulente personale\na tua disposizione',
    image: require('../../../../../assets/images/slider-img-2.webp'),
  },
  {
    title: 'Instant win giornalieri\ncon fantastici premi',
    image: require('../../../../../assets/images/slider-img-3.webp'),
  },
  {
    title: 'Invita i tuoi amici e\ncrea la tua community',
    image: require('../../../../../assets/images/slider-img-4.webp'),
  },
];

/**
 * Presentation Screen
 */

export const Presentation: FC<PresentationScreenProps> = ({
  navigation: { navigate },
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const style = useThemedStyles(styles);
  const slideHeight = windowWidth * ASPECT_RATIO;
  const [activeSlideIndex, setActiveSlideIndex] =
    useState<number>(INITIAL_INDEX);

  return (
    <>
      <View
        style={{
          height: Platform.OS === 'ios' ? '63%' : '65%',
        }}>
        <SnapCarousel
          vertical={false}
          data={slides}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          contentContainerCustomStyle={[
            style.carouselWrapper,
            { height: isSmallDevice() ? 300 : '100%' },
          ]}
          onSnapToItem={slideIndex => setActiveSlideIndex(slideIndex)}
          renderItem={({ item }) => (
            <PresentationCarouselItem item={item} height={slideHeight} />
          )}
          useScrollView
          autoplay
          autoplayInterval={4000}
          enableSnap
          lockScrollWhileSnapping
          loop
          loopClonesPerSide={4}
        />
        <Pagination
          dotsLength={slides.length}
          activeDotIndex={activeSlideIndex}
          inactiveDotStyle={style.inactiveDot}
          inactiveDotScale={INACTIVE_DOT_SCALE}
          dotContainerStyle={style.dotContainer}
          dotStyle={style.dot}
          containerStyle={style.paginationContainer}
          animatedDuration={0}
        />
      </View>
      <LoginFooter containerStyle={style.footerContainerStyle}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Spacer height={'8%'} />
          <Button
            accessibilityLabel="crea un account"
            title="crea un account"
            type="secondary"
            onPress={() => navigate('Register')}
          />
          <Spacer height={isSmallDevice() ? 10 : undefined} />
          <Button
            accessibilityLabel="accedi"
            title="accedi"
            type="primary"
            onPress={() => navigate('Login')}
          />
          <Spacer height={'5%'} />
          <Text style={style.disclaimer}>
            Potrebbero essere applicati costi aggiuntivi per gli SMS. Verifica
            con il tuo operatore. Procedendo accetto i termini del Mia Shopping
            Service e confermo di aver letto l’informativa sulla privacy di Mia.
          </Text>
        </ScrollView>
      </LoginFooter>
    </>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    carouselWrapper: {
      backgroundColor: theme.colors.bgLoginBody,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 10,
    },
    paginationContainer: {
      position: 'absolute',
      paddingVertical: 0,
      bottom: isSmallDevice() ? 85 : 120,
      left: 0,
      right: 0,
    },
    dotContainer: {
      marginHorizontal: 4,
    },
    dot: {
      ...baseDotStyle,
      backgroundColor: theme.colors.dotActive,
    },
    inactiveDot: {
      ...baseDotStyle,
      borderWidth: 2,
      borderColor: theme.colors.dotActive,
      backgroundColor: theme.colors.white,
    },
    spacer: {
      flex: 1,
      backgroundColor: theme.colors.bgLoginFooter,
    },
    footerContainerStyle: {
      justifyContent: 'center',
      paddingHorizontal: 36,
    },
    disclaimer: {
      fontFamily: theme.fonts.light,
      fontSize: 8,
      height: 100,
      textAlign: 'justify',
    },
  });
