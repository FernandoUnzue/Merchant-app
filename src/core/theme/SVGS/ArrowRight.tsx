import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ArrowRightIcon = ({
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
    viewBox="0 0 19.28 19.28"
    height={size}
    width={size}
    style={{
      ...styles
    }}
    >
    <Path
      d="m7.5 14 3.85-3.44c.57-.51.57-1.32 0-1.84L7.5 5.28"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);

export default ArrowRightIcon;
