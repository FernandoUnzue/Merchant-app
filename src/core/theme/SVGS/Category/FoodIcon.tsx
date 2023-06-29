import * as React from "react";
import Svg, { SvgProps, Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

const FoodIcon = ({
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
    viewBox="0 0 56.52 45.73"
   width={size}
   height={size}
   style={{
    ...styles
   }}
  >
    <Defs></Defs>
    <Path
     style={{
        fill:color
     }}
      d="M55.31 24.35H1.07a1.071 1.071 0 0 0 0 2.14h1.88l3.03 1.71H50.4l3.03-1.71h1.89a1.071 1.071 0 0 0 0-2.14Z"
    />
    <Path
      d="M8.28 30.37c1.02-2.13 14.2 1.91 14.2 1.91s-2.85 3.22 8.36 4.54c4.38.38 8.3.11 8.25-.43-.04-.42-1.94 0-4.45-.12-3.93-.18-9.24-.78-10.72-2.18-1.13-1.06.05-2.12 2.69-2.24 2.02-.09 4.81.68 8.73.24 3.91-.44 6.86-2.48 8.9-2.37 2.86.16 5.03 1.19 7.68 3.98 1.06 1.11 3.7 4.12 3.7 4.12 3.64 3.8-4.61 10.25-7.38 7.05-2.18-2.52-4.81-4.6-7.42-4.28-5.25.49-9.72 1.38-11.26.86-1.32-.44-2.43-2.24-3.74-2.69-9.43-3.27-18.54-6.26-17.53-8.38Z"
      style={{
        fill: "#35aeb1",
      }}
    />
    <Path
       style={{
        fill: color
     }}
      d="M30.58 4.44v-.17c1.62-.63 2.78-2.26 2.93-2.47.22-.33.24-.81.05-1.16-.18-.35-.56-.63-.96-.63h-9.11c-.41 0-.78.3-.96.67-.18.37-.11.84.15 1.16.27.33 1.48 1.77 2.76 2.39v.25C10.42 5.62 5.64 17.09 5.64 22.21h44.87c0-4.7-4.64-16.76-19.93-17.77Z"
    />
  </Svg>
);

export default FoodIcon;
