import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Path } from 'react-native-svg';
const StarWhiteIcon = ({
  color = '#88dada',
  size = 25,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: ViewStyle;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28.59 27.36"
    width={size}
    height={size}
    style={{
      ...styles,
    }}>
    <Path
      d="m14.29 2.18 3.3 6.69c.28.57.82.96 1.44 1.05L26.42 11l-5.35 5.21a1.92 1.92 0 0 0-.55 1.7l1.26 7.35-6.61-3.47c-.28-.15-.59-.22-.89-.22s-.61.07-.89.22l-6.61 3.47 1.26-7.35c.11-.62-.1-1.26-.55-1.7L2.16 11l7.39-1.08c.63-.09 1.17-.48 1.44-1.05l3.3-6.69m0-2.18c-.61 0-1.22.32-1.53.95L9.27 8.03 1.46 9.17c-1.4.2-1.96 1.93-.95 2.92l5.65 5.5-1.34 7.78c-.19 1.11.7 2 1.69 2 .26 0 .53-.06.79-.2l6.98-3.67 6.98 3.67c.26.14.53.2.79.2.99 0 1.88-.89 1.69-2l-1.34-7.78 5.65-5.5c1.02-.99.45-2.72-.95-2.92l-7.81-1.14L15.83.95C15.52.32 14.91 0 14.29 0Z"
      style={{
        fill: color,
      }}
    />
  </Svg>
);
export default StarWhiteIcon;
