import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Path } from 'react-native-svg';

const OkIcon = ({
  color = '#8ececd',
  size = 25,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: ViewStyle;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 126.04 126.04"
    height={size}
    width={size}
    style={{
      ...styles,
    }}>
    <Path
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 6,
      }}
      d="m32.98 63.2 20.48 20.48 68.41-67.52"
    />
    <Path
      d="M120.34 45.16c1.75 5.64 2.7 11.64 2.7 17.85 0 33.15-26.87 60.02-60.02 60.02S3 96.17 3 63.02 29.87 3 63.02 3c12.43 0 23.97 3.78 33.55 10.25"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 6,
      }}
    />
  </Svg>
);

export default OkIcon;
