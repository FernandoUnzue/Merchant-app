import * as React from 'react';
import Svg, { SvgProps, Path, Circle, Rect } from 'react-native-svg';

const UserDataIcon = ({
  color = '#000',
  size = 25,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 33 33"
    width={size}
    height={size}>
    <Path
      d="M7.01 23.65c0-5.6 3.79-5.6 8.7-5.6"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Circle
      cx={15.71}
      cy={11.92}
      r={3.6}
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
      d="M17.12 18.05h8.84m-8.84 2.8h8.84m-8.84 2.8h8.84"
    />
    <Rect
      x={2.59}
      y={4.99}
      width={27.82}
      height={23.02}
      rx={2.58}
      ry={2.58}
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);

export default UserDataIcon;
