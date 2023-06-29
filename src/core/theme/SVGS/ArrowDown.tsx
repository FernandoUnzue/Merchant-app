import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ArrowDown = ({
  color = '#000',
  size = 25,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: any;
}) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19.28 19.28"
    height={size}
    width={size}
    style={{
      ...styles,
    }}>
    <Path
      d="M5.28,7.5l3.44,3.85c.51,.57,1.32,.57,1.84,0l3.44-3.85"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);

export default ArrowDown;
