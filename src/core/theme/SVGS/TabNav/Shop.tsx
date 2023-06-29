import * as React from 'react';
import Svg, { SvgProps, G, Line, Path, Polygon } from 'react-native-svg';

const ShopIcon = ({
  size = 25,
  color = '#000',
  styles,
}: {
  size?: number;
  color?: string;
  styles?: any;
}) => (
  <Svg
    id="Layer_1"
    height={size}
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 31.8 29.26"
    style={{
      ...styles,
    }}>
    <G id="store">
      <G>
        <Line
          x1={5.35}
          y1={27.2}
          x2={26.45}
          y2={27.2}
          style={{
            fill: 'none',
            stroke: color,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
        <G>
          <Line
            x1={5.35}
            y1={16.66}
            x2={5.35}
            y2={27.2}
            style={{
              fill: 'none',
              stroke: color,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          />
          <Line
            x1={13.06}
            y1={16.66}
            x2={13.06}
            y2={27.2}
            style={{
              fill: 'none',
              stroke: color,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          />
          <Line
            x1={26.45}
            y1={16.66}
            x2={26.45}
            y2={26.8}
            style={{
              fill: 'none',
              stroke: color,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          />
        </G>
      </G>
      <G>
        <Path
          d="M28.07,9.36v2.64c0,1.67-1.37,3.04-3.04,3.04h0c-1.67,0-3.04-1.37-3.04-3.04,0,1.67-1.37,3.04-3.04,3.04h0c-1.67,0-3.04-1.37-3.04-3.04,0,1.67-1.37,3.04-3.04,3.04h0c-1.67,0-3.04-1.37-3.04-3.04,0,1.67-1.37,3.04-3.04,3.04h0c-1.67,0-3.04-1.37-3.04-3.04v-2.64"
          style={{
            fill: 'none',
            stroke: color,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
        <Polygon
          points="28.07 9.36 3.73 9.36 7.38 2.06 24.42 2.06 28.07 9.36"
          style={{
            fill: 'none',
            stroke: color,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
        <Line
          x1={15.9}
          y1={2.06}
          x2={15.9}
          y2={6.92}
          style={{
            fill: 'none',
            stroke: color,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
        <Line
          x1={9.82}
          y1={6.92}
          x2={11.84}
          y2={2.06}
          style={{
            fill: 'none',
            stroke: color,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
        <Line
          x1={21.98}
          y1={6.92}
          x2={19.96}
          y2={2.06}
          style={{
            fill: 'none',
            stroke: color,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
      </G>
    </G>
  </Svg>
);

export default ShopIcon;
