import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const DoubleArrowIcon = ({
  color = '#9b9b9b',
  size = 25,
  styles
}: {
  color?: string;
  size?: number;
  styles?: any;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 9.24 9.24"
    width={size}
    height={size}
    style={{
      ...styles
    }}
    >
    <Path
      d="M.48 5.46 5.16.77M2.15.48h3.31v3.3m3.31 0L4.08 8.47m3.01.3H3.78V5.46"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '.95px',
      }}
    />
  </Svg>
);

export default DoubleArrowIcon;
