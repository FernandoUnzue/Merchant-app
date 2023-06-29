import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Rect, Path, Circle } from 'react-native-svg';
const PromoIcon = ({
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
    viewBox="0 0 31.8 29.26"
    width={size}
    height={size}
    style={{
      ...styles,
    }}>
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
      d="m4.48 21.34-.8.08c-.72.07-1.36-.45-1.43-1.17L.88 6.58c-.07-.72.45-1.36 1.17-1.43L23.52 3c.72-.07 1.36.45 1.43 1.17l.28 2.79"
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
      d="M21.78 22.35h0c-1.08 0-1.96-.88-1.96-1.96h0c0-1.08.88-1.96 1.96-1.96h0c1.08 0 1.96.88 1.96 1.96h0c0 1.08-.88 1.96-1.96 1.96Zm-7.2.29 8.5-9.74"
      style={{
        fill: 'none',
        stroke: '#000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);
export default PromoIcon;
