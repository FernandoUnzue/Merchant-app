import * as React from "react";
import Svg, { SvgProps, Defs, Ellipse, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

const PetsIcon = ({
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
    viewBox="0 0 52.81 38.87"
   height={size}
   width={size}
   style={{
    ...styles
   }}
  >
    <Defs></Defs>
    <Ellipse
     style={{
        fill: color
     }}
      cx={35.3}
      cy={7.69}
      rx={7.81}
      ry={6.58}
      transform="rotate(-70.89 35.296 7.684)"
    />
    <Ellipse
       style={{
        fill: color
     }}
      cx={47.11}
      cy={20.56}
      rx={6.47}
      ry={5.32}
      transform="rotate(-56.04 47.11 20.561)"
    />
    <Ellipse
      style={{
        fill: color
     }}
      cx={17.51}
      cy={7.69}
      rx={6.58}
      ry={7.81}
      transform="rotate(-19.11 17.522 7.684)"
    />
    <Ellipse
      style={{
        fill: color
     }}
      cx={5.7}
      cy={20.56}
      rx={5.32}
      ry={6.47}
      transform="rotate(-33.96 5.7 20.555)"
    />
    <Path
      style={{
        fill: color
     }}
      d="M26.38 17.78c-7.69-.06-16.92 10.54-14.5 18.58 2.56 6.49 8.91-1.65 14.5-1.66 5.59 0 11.94 8.14 14.5 1.66 2.42-8.03-6.81-18.64-14.5-18.58Z"
    />
  </Svg>
);

export default PetsIcon;
