import * as React from 'react';
import Svg, { SvgProps, Path, Circle, Rect } from 'react-native-svg';

const FriendsIcon = ({
  color = '#000',
  size = 25,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 34.02 26.05"
    width={size}
    height={size}>
    <Path
      d="M21.07 13.68c-6.01 0-11.18 4.48-12.02 10.41-.04.29.04.57.24.79.2.23.48.36.78.36h22c.3 0 .58-.13.78-.36.19-.22.28-.5.24-.79-.84-5.94-6.01-10.41-12.02-10.41Z"
      style={{
        fill: 'none',
        stroke: color,
        strokeMiterlimit: 10,
      }}
    />
    <Path
      d="M14.99 15.36a8.895 8.895 0 0 0-5.25-1.7c-4.28 0-7.98 3.05-8.8 7.24-.05.27.02.53.2.75.2.24.5.39.81.39h7.57"
      style={{
        fill: 'none',
        stroke: color,
        strokeMiterlimit: 10,
      }}
    />
    <Circle
      cx={9.54}
      cy={7.93}
      r={4.07}
      style={{
        fill: 'none',
        stroke: color,
        strokeMiterlimit: 10,
      }}
    />
    <Rect
      x={17}
      y={0.81}
      width={8.14}
      height={11.1}
      rx={4.07}
      ry={4.07}
      style={{
        fill: 'none',
        stroke: color,
        strokeMiterlimit: 10,
      }}
    />
  </Svg>
);

export default FriendsIcon;
