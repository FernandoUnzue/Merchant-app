import * as React from 'react';
import Svg, { SvgProps, Path, Polyline, Rect } from 'react-native-svg';

const GiftIcon = ({
  size = 25,
  color = '#000',
}: {
  size?: number;
  color?: string;
}) => (
  <Svg
    id="Layer_1"
    height={size}
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 31.8 29.26">
    <Path
      d="M16.01,8.43s.33-4.69,2.61-6.68c1.56-1.36,3.97-1.15,4.91,.11,.94,1.26,.86,3.12-.7,4.48-2.29,1.99-6.82,2.09-6.82,2.09Z"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Path
      d="M16.01,8.43s-.12-4.06-2.13-5.68c-1.37-1.11-3.3-1.25-4.36,.05-.85,1.04-.7,2.59,.67,3.7,2.01,1.62,4.37,1.89,5.82,1.93Z"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Polyline
      points="17.97 28.44 29.01 28.44 29.01 13.95"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Polyline
      points="2.79 13.95 2.79 16.83 2.79 28.44 10.27 28.44 13.83 28.44"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Polyline
      points="17.97 13.95 29.7 13.95 29.7 8.43 2.1 8.43 2.1 13.95 13.83 13.95"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Rect
      x={13.83}
      y={8.43}
      width={4.14}
      height={20.01}
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);

export default GiftIcon;
