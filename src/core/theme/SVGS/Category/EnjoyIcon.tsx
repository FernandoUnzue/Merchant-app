import * as React from "react";
import Svg, { SvgProps, Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

const EnjoyIcon = ({
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
    viewBox="0 0 60.53 51.07"
   width={size}
   height={size}
   style={{
    ...styles
   }}
  >
    <Defs></Defs>
    <Path
      style={{
        fill:"#35aeb1"
      }}
      d="M46.1 43.06c0 .1-.07.18-.15.21a.19.19 0 0 1-.23-.08c-.52-.82-1.93-2.32-5.48-3.18-3.55-.88-5.49-.2-6.32.29-.08.04-.18.03-.24-.03a.245.245 0 0 1-.04-.26c.81-1.76 3.46-4.38 7.63-3.43 4.13 1.08 4.93 4.55 4.84 6.49Zm-5.45-14.2c.7-.27 1.22-1.49.82-2.63-.49-1.41-2.63-2.46-5.01-1.49-.23 1.25-.57 2.43-.97 3.57 1.11.43 3.86 1.06 5.16.55Z"
    />
    <Path
       style={{
        fill:"#35aeb1"
      }}
      d="M57.06 17.12c-5.27.59-10.93-1.03-10.93-1.03s-5.76-1.18-10.16-4.14c.22 1.36.43 2.84.62 4.42 3.89 1.99 7.78 2.9 8.66 3.11 1.16.28 6.48 1.68 11.83 1.22.2 1.25.19 4.85-2.68 14.17-3.25 10.58-13.3 13.27-15.9 12.63-1.9-.47-6.48-4.35-8.07-10.64-.9.99-1.82 1.86-2.76 2.6 2.19 6.41 6.94 10.68 10.01 11.43 4.62 1.13 16.27-2.99 19.96-15 3.68-12.02 4.19-19.31-.58-18.77Z"
    />
    <Path
        style={{
            fill:"#35aeb1"
          }}
      d="M51.02 28.98c-1.66-2.45-3.97-2.58-5.14-1.47-.86.83-.96 2.15-.47 2.72.98 1.12 3.66 1.69 4.69 1.74 1.02.05 2.33-.92.92-2.98Z"
    />
    <Path
      d="M33.89 17.6C32.44 4.98 29.94-1.96 25.7.49c-4.67 2.7-10.6 3.69-10.6 3.69s-5.91 1.1-11.23.15C-.95 3.47-.92 10.85 2.03 23.2c2.95 12.35 14.55 17.27 19.32 16.42 4.77-.84 13.99-9.42 12.53-22.03ZM8.74 15.12c2.64-1.52 5.24-.48 5.86 1.05.46 1.13-.01 2.39-.73 2.69-1.42.6-4.65-.03-5.64-.42-.99-.4-1.73-2.02.51-3.31ZM19.92 32.6c-5.08.82-7.78-2.17-8.58-4.13-.04-.1-.01-.21.07-.28.08-.07.2-.08.29-.03.96.57 3.21 1.22 7.55.46s6.17-2.14 6.87-3c.07-.09.18-.11.28-.08.1.04.17.14.16.24-.08 2.12-1.6 5.84-6.65 6.81Zm6.56-17.58c-.8.71-3.62 2.41-5.16 2.33-.77-.04-1.65-1.06-1.61-2.28.07-1.65 2.15-3.51 5.15-2.98 2.54.45 2.4 2.22 1.61 2.93Z"
      style={{
        fill: color,
      }}
    />
  </Svg>
);

export default EnjoyIcon;
