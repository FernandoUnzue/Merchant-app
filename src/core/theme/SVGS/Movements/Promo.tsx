import * as React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

const PromoIcon = ({
  color = '#000',
  size = 25,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 33 33"
    height={size}
    width={size}>
    <Path
      d="M24.59 9.93 22.1 7.65c-.22-.2-.56-.2-.78 0l-6.15 5.63c-.24.22-.37.53-.37.85v14.46c0 .64.52 1.15 1.15 1.15h11.51c.64 0 1.15-.52 1.15-1.15V14.13c0-.32-.14-.63-.37-.85l-2.51-2.3m-6.32 14.73 4.61-8.06"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Path
      d="M18.07 9.01c-.27-.57-.41-1.21-.38-1.88.08-2.09 1.82-3.81 3.91-3.87 2.28-.06 4.15 1.76 4.15 4.03s-1.8 4.03-4.03 4.03m-.01-1.15v2.3m-5.98-3.08-2.6 1.42c-.28.15-.49.42-.56.73L9.12 25.58c-.15.62.23 1.24.84 1.39l3.14.77"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Path
      d="m15.24 7.27-2.68.32c-.32.04-.61.21-.8.47L3.33 19.82c-.37.52-.25 1.24.26 1.61l4.01 2.88"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Circle
      cx={24.3}
      cy={23.5}
      r={1.3}
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Circle
      cx={19.28}
      cy={19.9}
      r={1.3}
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);

export default PromoIcon;
