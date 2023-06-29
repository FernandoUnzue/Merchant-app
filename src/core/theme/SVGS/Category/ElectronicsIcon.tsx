import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ElectronicIcon = ({
  color = '#88dad4',
  size = 25,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: ViewStyle;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64.11 47.92"
    width={size}
    height={size}
    style={{
      ...styles,
    }}>
    <Path
      d="M48.09 0H4.62C2.07 0 0 2.07 0 4.62v25.89c0 2.55 2.07 4.62 4.62 4.62h43.46c2.55 0 4.62-2.07 4.62-4.62V4.62C52.7 2.07 50.63 0 48.08 0ZM26.36 34.29c-.97 0-1.76-.79-1.76-1.76s.79-1.76 1.76-1.76 1.76.79 1.76 1.76-.79 1.76-1.76 1.76Zm23.27-4.08H3.08V3.08h46.54V30.2Z"
      style={{
        fill: '#35aeb1',
      }}
    />
    <Path
      d="M61.98 5.23H55.7v4.59h6.16v5.1H55.7v3.15h6.16v5.1H55.7v7.33c0 4.2-3.41 7.61-7.61 7.61H41.6v7.66c0 1.18.96 2.13 2.14 2.13h18.25c1.18 0 2.13-.96 2.13-2.13V7.36c0-1.18-.96-2.13-2.13-2.13Zm-.12 36.02H43.85V40.1h18.01v1.15Z"
      style={{
        fill: color,
      }}
    />
    <Path
      style={{
        fill: '#35aeb1',
      }}
      d="M23.28 37.07h6.15v5.89h-6.15zm12.6 7.82H16.82c-1.67 0-3.03 1.36-3.03 3.03h25.12c0-1.67-1.36-3.03-3.03-3.03Z"
    />
  </Svg>
);
export default ElectronicIcon;
