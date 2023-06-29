import * as React from "react";
import Svg, { SvgProps, Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

const PerfumeIcon = ({
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
    viewBox="0 0 58.15 47.82"
    width={size}
    height={size}
    style={{
        ...styles
    }}
  >
    <Defs></Defs>
    <Path style={{
        fill:color
    }} d="M36.72 0h7.45v8.92h-7.45z" />
    <Path
     style={{
        fill:color
    }}
      d="M34.67 8.55h11.54v5.58H34.67zM10.23 28.09l-2.25-.43c.05-.26 1.24-6.35 5.44-12.53C17.33 9.37 24.68 2.48 37.46 2.38l.02 2.29c-9.47.07-16.93 4.03-22.17 11.74-3.94 5.8-5.08 11.62-5.09 11.68Zm46.09-7.87-3.54-3.14a5.47 5.47 0 0 0-3.62-1.37H31.72c-1.33 0-2.62.49-3.62 1.37l-3.54 3.14a5.45 5.45 0 0 0-1.72 5.16l3.69 18.08a5.45 5.45 0 0 0 5.34 4.36h17.15a5.45 5.45 0 0 0 5.34-4.36l3.69-18.08a5.45 5.45 0 0 0-1.72-5.16Z"
    />
    <Path
      d="M18.22 36.49c0 6.26-4.08 11.34-9.11 11.34S0 42.75 0 36.49s4.08-10.33 9.11-10.33 9.11 4.07 9.11 10.33Z"
      style={{
        fill: "#35aeb1",
      }}
    />
  </Svg>
);

export default PerfumeIcon;
