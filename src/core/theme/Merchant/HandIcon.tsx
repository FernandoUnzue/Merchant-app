import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Path } from 'react-native-svg';
const HandIcon = ({
  color = '#f2ce06',
  size = 25,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: ViewStyle;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 46.899 46.899"
    style={{
      ...styles,
    }}>
    <Path
      data-name="Icon ionic-md-hand"
      d="M35 13.804a2.68 2.68 0 0 0-2.83 2.687v4.538a1.582 1.582 0 0 1-1.617 1.82c-.6-.05-1.493-1.16-2.052-1.873l-8.217-10.494a2.158 2.158 0 1 0-3.396 2.66l6.093 8.601c.117.249.005.419-.254.19l-9.975-9.126a2.157 2.157 0 0 0-3.05 3.05l9.592 9.651c.12.104.055.229-.088.121l-8.871-6.15a2.2 2.2 0 0 0-3.05.495 2.223 2.223 0 0 0 .59 3.048l9.997 7.581c.157.156.195.296-.08.171l-6.622-3.016a2.193 2.193 0 0 0-2.918.971 2.23 2.23 0 0 0 1.064 2.921l13.483 7.165.221.118.028.015.005.005A9.506 9.506 0 0 0 34.085 37.2a12.863 12.863 0 0 0 3.576-7.241c.65-2.616.257-13.469.257-13.469A2.758 2.758 0 0 0 35 13.804Z"
      fill={color}
    />
  </Svg>
);
export default HandIcon;
