import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const RegaliIcon = ({
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
      d="M12.04 26.6c.24-.24.49-.64 1.28-.64h8.93c.71 0 4.6-3.91 5.1-4.46.48-.53 2.6-3.72 3.19-5.1-.37-.5-1.37-.91-2.55-.64-1.13.26-1.79 1.07-2.55 2.55l-2.92 1.52"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Path
      d="M15.86 22.13h5.1c2.55 0 2.55-3.19 0-3.19h-3.37c-.53 0-1.53-1.28-2.37-1.28h-3.19c-.86 0-1.93.7-2.55 1.28l-2.55 2.55"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Path
      transform="rotate(-45 7.891 25.641)"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
      d="M5.64 20.23h4.51v10.82H5.64z"
    />
    <Path
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
      d="m5.66 23.41 1.28 1.27M19.05 7.47s.23-3.42 1.85-4.87c1.11-.99 2.6-.8 3.42.12.82.92.67 2.24-.44 3.22-1.62 1.45-4.84 1.52-4.84 1.52Z"
    />
    <Path
      d="M19.05 7.47s-.08-2.85-1.35-3.99c-.87-.78-2.05-.63-2.7.09-.65.73-.53 1.76.35 2.54 1.28 1.14 2.78 1.33 3.7 1.36Zm7.65 8.93v-5.1m-15.3 0v6.37"
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
      d="M20.96 11.3h7.02V7.47H10.12v3.83h7.02"
    />
    <Path
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
      d="M17.14 18.95V7.47h3.82v11.48"
    />
  </Svg>
);

export default RegaliIcon;
