import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ArrowRightForwardIcon = ({
  color = '#000',
  size = 25,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: ViewStyle;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 9.73 8.95"
    height={size}
    width={size}
    style={{
      ...styles,
    }}>
    <Path
      d="m5.56 8.27 3.17-3c.47-.45.47-1.15 0-1.6L5.56.68m3.19 3.8H.65"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);

export default ArrowRightForwardIcon;
