import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Defs, Path, Circle } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */
const Coupon2Icon = ({
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
    viewBox="0 0 26.5 27.48"
    height={size}
    width={size}
    style={{
      ...styles,
    }}>
    <Defs></Defs>

    <Path
      style={{ strokeMiterLimit: 10, fill: 'none', stroke: '#141414' }}
      d="m21.97 7.17-2.49-2.28c-.22-.2-.56-.2-.78 0l-6.15 5.63c-.24.22-.37.53-.37.85v14.46c0 .64.52 1.15 1.15 1.15h11.51c.64 0 1.15-.52 1.15-1.15V11.37c0-.32-.14-.63-.37-.85l-2.51-2.3"
    />
    <Path
      style={{
        strokeLinejoin: 'round',
        strokeLinecap: 'round',
        fill: 'none',
        stroke: '#141414',
      }}
      d="m16.79 22.95 4.61-8.06"
    />
    <Path
      style={{ strokeMiterlimit: 10, fill: 'none', stroke: '#141414' }}
      d="M15.45 6.26c-.27-.57-.41-1.21-.38-1.88.08-2.09 1.82-3.81 3.91-3.87 2.28-.06 4.15 1.76 4.15 4.03s-1.8 4.03-4.03 4.03m0-1.16v2.3"
    />
    <Path
      style={{ strokeLinecap: 'round', stroke: '#000' }}
      d="m13.11 6.64-2.6 1.42c-.28.15-.49.42-.56.73L6.5 22.83c-.15.62.23 1.24.84 1.39l3.14.77"
    />
    <Path
      style={{ strokeLinecap: 'round', stroke: '#000' }}
      d="m12.62 4.51-2.68.32c-.32.04-.61.21-.8.47L.72 17.07c-.37.52-.25 1.24.26 1.61l4.01 2.88"
    />
    <Circle
      style={{ strokeMiterLimit: 10, fill: 'none', stroke: '#141414' }}
      cx={21.69}
      cy={20.74}
      r={1.3}
    />
    <Circle
      style={{ strokeMiterLimit: 10, fill: 'none', stroke: '#141414' }}
      cx={16.66}
      cy={17.14}
      r={1.3}
    />
  </Svg>
);
export default Coupon2Icon;
