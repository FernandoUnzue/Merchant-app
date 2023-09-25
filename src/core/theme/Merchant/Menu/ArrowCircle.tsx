import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
const ArrowCircleIcon = ({
  color = '#292d32',
  size = 25,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: ViewStyle;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{
      ...styles,
    }}>
    <G
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}>
      <Path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10Z" />
      <Path data-name="Vector" d="M10.74 15.53 14.26 12l-3.52-3.53" />
    </G>
  </Svg>
);
export default ArrowCircleIcon;
