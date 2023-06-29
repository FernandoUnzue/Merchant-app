import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Circle, G, Path, Line } from 'react-native-svg';
const ArrowDownMenu = ({
  color = '#000',
  size = 25,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: ViewStyle;
}) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23.52 23.52"
    width={size}
    height={size}
    style={{
      ...styles,
    }}>
    <Circle
      cx={11.76}
      cy={11.76}
      r={11.26}
      style={{
        fill: '#f5f5f5',
        stroke: '#dedede',
        strokeMiterlimit: 10,
      }}
    />
    <G>
      <Path
        d="m6.28,13.37l4.33,4.57c.64.68,1.66.68,2.31,0l4.33-4.57"
        style={{
          fill: 'none',
          stroke: '#88dad4',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
      <Line
        x1={11.76}
        y1={5.21}
        x2={11.76}
        y2={15.25}
        style={{
          fill: 'none',
          stroke: '#88dad4',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
    </G>
  </Svg>
);
export default ArrowDownMenu;
