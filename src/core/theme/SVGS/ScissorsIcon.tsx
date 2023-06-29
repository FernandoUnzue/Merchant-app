import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Defs, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */
const ScissorsIcon = ({
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
    viewBox="0 0 18.43 19.4"
    width={size}
    height={size}
    style={{
      ...styles,
    }}>
    <Defs></Defs>
    <Path
      style={{
        fill: 'none',
        stroke: '#88dad4',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '.82px',
      }}
      d="M14.1 1.88h3.91v8.6h-.78m-5.87 0H.41v-8.6h10.64M12.54.71v1.95m0 1.18v1.95m0 1.17v1.96"
    />
    <Path
      style={{
        fill: 'none',
        stroke: '#88dad4',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '.82px',
      }}
      d="M15.79 6.96c-.4.58-3.7 5.29-3.7 5.29-.27.39-.71.64-1.18.74h0c-.26.06-.37.22-.53.44l-1.22 1.75c-.99-.21-2.03.19-2.52.92-.59.88-.41 1.87.31 2.35.72.49 1.74.22 2.29-.58l2.36-3.36c.94-.22 1.82-.6 2.29-1.26.51-.72 1.01-1.54 1.64-2.71 1.17-2.19.66-3.31.27-3.58Zm-5.02 3.53c.19.27.36.52.52.74m-1.73 1.05c-.33-.52-.68-1.1-1.05-1.8m5.91 3.96.52.74c.99-.21 2.03.19 2.52.92.59.88.41 1.87-.31 2.35-.72.49-1.74.22-2.29-.58 0 0-1.07-1.53-1.78-2.55"
    />
  </Svg>
);
export default ScissorsIcon;
