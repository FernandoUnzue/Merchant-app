import * as React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

const FilterIcon = ({
  color = '#35373a',
  size = 25,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: any;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 33 33"
    width={size}
    height={size}
    style={{
      ...styles,
    }}>
    <Path
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
      d="M3.59 8.59h5.4m5.04 0h15.38"
    />
    <Circle
      cx={11.53}
      cy={8.59}
      r={2.46}
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
      d="M3.59 24.41h9.66m4.92 0h11.24"
    />
    <Circle
      cx={15.71}
      cy={24.41}
      r={2.46}
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
      d="M29.41 16.5h-5.42m-5 0H3.59"
    />
    <Circle
      cx={21.49}
      cy={16.5}
      r={2.46}
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);

export default FilterIcon;
