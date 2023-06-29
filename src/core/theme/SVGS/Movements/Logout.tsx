import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const LogoutIcon = ({
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
      d="M20.47 7.37c3.89 1.57 6.64 5.39 6.64 9.84 0 5.86-4.75 10.61-10.61 10.61S5.89 23.07 5.89 17.21c0-4.45 2.75-8.27 6.64-9.84m3.97-2.18v6.87"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);

export default LogoutIcon;
