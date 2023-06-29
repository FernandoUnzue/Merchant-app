import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";

export const SearchIcon = ({
    color = '#000',
    size = 25,
    styles,
  }: {
    color?: string;
    size?: number;
    styles?: any;
  }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" 
  
  width={size}
  height={size}
  style={{
    ...styles
  }}
  >
    <Circle
      cx={6.8}
      cy={6.8}
      r={6.1}
      style={{
        fill: "none",
        stroke: color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
    />
    <Path
      style={{
        fill: "none",
        stroke: color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
      d="m11.1 11.1 6.2 6.2"
    />
  </Svg>
);

export default SearchIcon;
