import * as React from "react";
import Svg, { SvgProps, Defs, Circle } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

const PointsIcon = ({
    color = '#35aeb1',
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
    viewBox="0 0 9.87 9.29"
   height={size}
   width={size}
   style={{
    ...styles
   }}
  >
    <Defs></Defs>
    <Circle style={{
        fill: color
    }} cx={2} cy={2} r={2} />
    <Circle style={{
        fill:color
    }} cx={7.86} cy={2} r={2} />
    <Circle style={{
        fill: color
    }} cx={7.86} cy={7.29} r={2} />
    <Circle style={{
        fill:color
    }} cx={2} cy={7.29} r={2} />
  </Svg>
);

export default PointsIcon;
