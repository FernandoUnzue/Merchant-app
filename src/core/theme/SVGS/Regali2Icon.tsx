import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Path } from 'react-native-svg';
const Regali2Icon = ({
  color = '#88dad4',
  size = 300,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: ViewStyle;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23.32 28.87"
    height={size}
    width={size}
    style={{
      ...styles,
    }}>
    <Path
      d="M0 9.25v4.71c0 .25.21.46.46.46h10.26V8.79H.46C.21 8.79 0 9 0 9.25Zm22.86-.46H12.6v5.63h10.26c.25 0 .46-.21.46-.46V9.25c0-.25-.21-.46-.46-.46ZM1.11 28.41c0 .25.21.46.46.46h9.15V15.24H1.11v13.17Zm11.49.46h9.15c.25 0 .46-.21.46-.46V15.24H12.6v13.63ZM8.5 1.28C6.28-1.02 1.87-.11 2.32 3.75c.47 4.05 5.72 4.44 8.81 4.11-.05-.29-.1-.58-.14-.87-.31-1.87-1.1-4.28-2.48-5.71ZM4.46 3.23C3.62.49 7.04.44 8.34 2.3c.66.94 1.41 2.75 1.4 3.83 0 .32-4.79-1.3-5.28-2.9ZM21 3.72c.44-3.86-3.97-4.77-6.19-2.47-1.38 1.43-2.17 3.84-2.48 5.71-.05.29-.1.58-.14.87 3.09.33 8.34-.06 8.81-4.11ZM13.57 6.1c0-1.08.74-2.89 1.4-3.83 1.3-1.86 4.72-1.8 3.88.93-.49 1.6-5.28 3.22-5.28 2.9Z"
      style={{
        fill: color,
      }}
    />
  </Svg>
);
export default Regali2Icon;
