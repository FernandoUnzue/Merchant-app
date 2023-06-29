import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Defs, Ellipse, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */
const CoinsIcon = ({
  color = '#9b9b9b',
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
    viewBox="0 0 18.42 18.42"
    width={size}
    height={size}
    style={{
      ...styles,
    }}>
    <Defs></Defs>
    <Ellipse
      style={{
        fill: 'none',
        stroke: '#88dad4',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '.83px',
      }}
      cx={7.54}
      cy={12.56}
      rx={2.93}
      ry={1.26}
    />
    <Path
      style={{
        fill: 'none',
        stroke: '#88dad4',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '.83px',
      }}
      d="M10.47 12.56v2.1c0 .69-1.31 1.26-2.93 1.26s-2.93-.56-2.93-1.26v-2.1"
    />
    <Path
      style={{
        fill: 'none',
        stroke: '#88dad4',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '.83px',
      }}
      d="M4.6 14.66v2.1c0 .69 1.31 1.26 2.93 1.26s2.93-.56 2.93-1.26v-2.1m3.78-4.19v2.1c0 .63-1.09 1.16-2.51 1.24"
    />
    <Ellipse
      style={{
        fill: 'none',
        stroke: '#88dad4',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '.83px',
      }}
      cx={11.31}
      cy={8.37}
      rx={2.93}
      ry={1.26}
    />
    <Path
      style={{
        fill: 'none',
        stroke: '#88dad4',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '.83px',
      }}
      d="M8.37 10.05V8.37m5.87 0v2.1c0 .66-1.17 1.2-2.67 1.25m.16 4.18c1.42-.09 2.51-.61 2.51-1.24v-2.1"
    />
    <Path
      style={{
        fill: 'none',
        stroke: '#88dad4',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '.83px',
      }}
      d="M7.54 7.12H6.28v2.51L.41 5.02 6.28.41v2.52h6.7c2.93 0 5.03 2.34 5.03 5.64 0 1.67-.53 3.26-1.5 4.42"
    />
    <Path
      style={{
        fill: 'none',
        stroke: '#88dad4',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '.83px',
      }}
      d="M17.38 11.58c.45-1.55-.42-2.87-1.79-3.62"
    />
  </Svg>
);
export default CoinsIcon;
