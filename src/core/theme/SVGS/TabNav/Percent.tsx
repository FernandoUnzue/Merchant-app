import * as React from 'react';
import Svg, { SvgProps, Rect, Path, Circle, Line } from 'react-native-svg';

const PercentIcon = ({
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
    <Rect
      x={6.73}
      y={9.27}
      width={24.2}
      height={17}
      rx={1.31}
      ry={1.31}
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Path
      d="M4.48,21.34l-.8,.08c-.72,.07-1.36-.45-1.43-1.17L.88,6.58c-.07-.72,.45-1.36,1.17-1.43L23.52,3c.72-.07,1.36,.45,1.43,1.17l.28,2.79"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Circle
      cx={15.89}
      cy={15.15}
      r={1.96}
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Path
      d="M21.78,22.35h0c-1.08,0-1.96-.88-1.96-1.96h0c0-1.08,.88-1.96,1.96-1.96h0c1.08,0,1.96,.88,1.96,1.96h0c0,1.08-.88,1.96-1.96,1.96Z"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Line
      x1={14.58}
      y1={22.64}
      x2={23.08}
      y2={12.9}
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);

export default PercentIcon;
