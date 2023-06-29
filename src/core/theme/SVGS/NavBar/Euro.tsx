import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Path, G, Line } from 'react-native-svg';

const EuroIcon = ({
  size = 25,
  color = '#000',
  styles
}: {
  size?: number;
  color?: string;
  styles?: ViewStyle;
}) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23.54 21.21"
    height={size}
    width={size}
    style={{
      ...styles,
      backgroundColor: 'transparent',
    }}>
    <Path
      d="M22.85,14.47c-1.51,3.56-5.03,6.06-9.14,6.06-5.48,0-9.92-4.44-9.92-9.92S8.23,.68,13.71,.68c4.05,0,7.52,2.42,9.07,5.89"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <G>
      <Line
        x1={0.69}
        y1={8.75}
        x2={12.89}
        y2={8.75}
        style={{
          fill: 'none',
          stroke: color,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
      <Line
        x1={0.69}
        y1={12.46}
        x2={12.89}
        y2={12.46}
        style={{
          fill: 'none',
          stroke: color,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
    </G>
  </Svg>
);

export default EuroIcon;
