import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';
const EyeOpenIcon = ({
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
    viewBox="0 0 19.27 12.09"
    width={size}
    height={size}
    style={{
      ...styles,
    }}>
    <Path
      d="M.5 8.02C.5 3.87 4.59.5 9.64.5s9.14 3.37 9.14 7.52"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Circle
      cx={9.64}
      cy={8.28}
      r={3.3}
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);
export default EyeOpenIcon;
