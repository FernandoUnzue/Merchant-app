import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const CheckIcon = ({
  color = '#35aeb1',
  size = 25,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: any;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 11.17 8.32"
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
        strokeWidth: '1.29px',
      }}
      d="m.65 4.95 2.72 2.73L10.52.65"
    />
  </Svg>
);

export default CheckIcon;
