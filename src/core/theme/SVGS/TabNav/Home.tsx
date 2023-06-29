import * as React from 'react';
import Svg, { SvgProps, G, Polyline, Polygon } from 'react-native-svg';

const HomeIcon = ({
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
    <G id="house">
      <Polyline
        points="2.4 12.45 15.9 1.13 22.87 6.98 22.87 3.31 26.79 3.31 26.79 10.26 29.4 12.45"
        style={{
          fill: 'none',
          stroke: color,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '.97px',
        }}
      />
      <Polygon
        points="26.79 14.63 26.79 28.13 19.38 28.13 19.38 20.73 12.42 20.73 12.42 28.13 5.01 28.13 5.01 14.63 15.9 5.49 26.79 14.63"
        style={{
          fill: 'none',
          stroke: color,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '.97px',
        }}
      />
    </G>
  </Svg>
);

export default HomeIcon;
