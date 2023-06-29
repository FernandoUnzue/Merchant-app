import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Path } from 'react-native-svg';
const EmptyCheckIcon = ({
  color = '#9b9b9b',
  size = 25,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: ViewStyle;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23.24 23.23"
    width={size}
    height={size}
    style={{
      ...styles,
    }}>
    <Path
      d="M3.04.57H20.2c1.36 0 2.47 1.1 2.47 2.47V20.2c0 1.36-1.1 2.46-2.46 2.46H3.04c-1.36 0-2.47-1.1-2.47-2.47V3.04C.57 1.68 1.68.57 3.04.57Z"
      style={{
        fill: 'none',
        stroke: '#d2d2d2',
        strokeMiterlimit: 10,
        strokeWidth: '1.15px',
      }}
    />
    <Path
      d="m8.07 14.02-2.55-2.55a.911.911 0 0 0-1.28 0c-.35.35-.35.92 0 1.28l3.83 3.83c.35.35.92.35 1.28 0L19 6.91c.35-.35.35-.92 0-1.28a.9.9 0 0 0-1.27 0l-8.39 8.39a.9.9 0 0 1-1.27 0"
      style={{
        fill: '#d2d2d2',
      }}
    />
  </Svg>
);
export default EmptyCheckIcon;
