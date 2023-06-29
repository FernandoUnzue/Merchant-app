import * as React from 'react';
import Svg, { SvgProps, Rect, Path, Circle } from 'react-native-svg';

const FilterRoundIcon = ({
  color = '#141414',
  size = 25,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: any;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 38.42 38.42"
    height={size}
    width={size}
    style={{
      ...styles,
    }}>
    <Rect
      x={0.5}
      y={0.5}
      width={37.42}
      height={37.42}
      rx={10.45}
      ry={10.45}
      style={{
        fill: 'none',
        stroke: color,
        strokeMiterlimit: 10,
      }}
    />
    <Path
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
      d="M7.52 12.05h4.88m4.58 0H30.9"
    />
    <Circle
      cx={14.71}
      cy={12.05}
      r={2.23}
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Path
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
      d="M7.52 26.37h8.74m4.47 0H30.9"
    />
    <Circle
      cx={18.5}
      cy={26.37}
      r={2.23}
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Path
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
      d="M30.9 19.21h-4.91m-4.52 0H7.52"
    />
    <Circle
      cx={23.73}
      cy={19.21}
      r={2.23}
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);

export default FilterRoundIcon;
