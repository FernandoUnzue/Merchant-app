import * as React from 'react';
import { SVGProps } from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Path } from 'react-native-svg';
const DiscountIcon = ({
  color = '#c6e0fc',
  size = 20,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: ViewStyle;
}) => (
  <Svg
    //  xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{
      ...styles,
    }}>
    <Path
      d="m3.989 14.66-1.52-1.52a1.606 1.606 0 0 1 0-2.26l1.52-1.52a1.845 1.845 0 0 0 .47-1.13V6.08a1.6 1.6 0 0 1 1.6-1.6h2.145a1.845 1.845 0 0 0 1.13-.47l1.525-1.52a1.606 1.606 0 0 1 2.26 0l1.52 1.52a1.845 1.845 0 0 0 1.13.47h2.15a1.6 1.6 0 0 1 1.6 1.6v2.145a1.845 1.845 0 0 0 .47 1.13l1.52 1.52a1.606 1.606 0 0 1 0 2.26l-1.52 1.52a1.845 1.845 0 0 0-.47 1.13v2.15a1.6 1.6 0 0 1-1.6 1.6h-2.15a1.845 1.845 0 0 0-1.13.47l-1.52 1.52a1.606 1.606 0 0 1-2.26 0l-1.52-1.52a1.845 1.845 0 0 0-1.13-.47h-2.15a1.6 1.6 0 0 1-1.6-1.6v-2.15a1.8 1.8 0 0 0-.47-1.125Z"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <Path
      data-name="Vector"
      d="m9 15 6-6"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <Path
      data-name="Vector"
      d="M14.495 14.5h.005m-5.005-5H9.5"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);
export default DiscountIcon;
