import * as React from "react";
import Svg, { SvgProps, Defs, Path, Rect } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

const PaintIcon = ({
    color = '#88dad4',
    size = 25,
    styles,
  }: {
    color?: string;
    size?: number;
    styles?: any;
  }) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 41.03 43.68"
   height={size}
   width={size}
   style={{
    ...styles
   }}
  >
    <Defs></Defs>
    <Path
     style={{
        fill: "#35aeb1"
     }}
      d="M0 7.29c0 .89.73 1.62 1.62 1.62h1.5V5.67h-1.5C.73 5.67 0 6.4 0 7.29Zm39.41-1.62h-3.4v3.24h1.78v6.89c0 1.72-1.28 2.01-2.03 2.03H23.61c-4.16 0-5.67 3.39-5.67 5.67v6.93h3.24V23.5c0-.41.12-2.43 2.43-2.43h12.15c2.12 0 5.27-1.4 5.27-5.27V7.29c0-.89-.73-1.62-1.62-1.62Z"
    />
    <Path
     style={{
        fill: color
     }}
      d="M21.31 31.47h-3.4c-.62 0-1.13.77-1.13 1.72v8.76c0 .95.5 1.72 1.13 1.72h3.4c.62 0 1.13-.77 1.13-1.72v-8.76c0-.95-.5-1.72-1.13-1.72Z"
    />
    <Rect
      style={{
        fill: color
     }}
      x={4.17}
      width={30.78}
      height={14.58}
      rx={1.89}
      ry={1.89}
    />
    <Path
       style={{
        fill: "#35aeb1"
     }}
      d="M10.87 23.71c-1.12-1.54-1.08-3.47-.19-4.27h-.01c-.63.25-1.23.59-1.77 1.02-1.22.99-3.33 2.94-3.33 5.66 0 3.09 1.95 4.3 3.55 4.3 2.4 0 3.29-2.12 3.29-3.54 0-1.72-.99-2.41-1.54-3.17Z"
    />
  </Svg>
);

export default PaintIcon;
