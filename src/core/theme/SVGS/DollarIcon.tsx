import * as React from 'react';
import { SVGProps } from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Path } from 'react-native-svg';
const DollarIcon = ({
  color = '#ed7652',
  size = 20,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: ViewStyle;
}) => (
  <Svg
    //xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 26.635 26.635"
    style={{
      ...styles,
    }}>
    <Path
      d="M9.624 15.903a2.522 2.522 0 0 0 2.464 2.586h2.785a2.206 2.206 0 0 0 2.151-2.253 1.942 1.942 0 0 0-1.463-2.141l-4.472-1.554a1.942 1.942 0 0 1-1.465-2.142 2.206 2.206 0 0 1 2.153-2.253h2.786a2.522 2.522 0 0 1 2.461 2.586"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <Path
      data-name="Vector"
      d="M13.318 6.659v13.318M24.42 13.32a11.1 11.1 0 1 1-11.1-11.1 11.1 11.1 0 0 1 11.1 11.1Z"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
export default DollarIcon;
