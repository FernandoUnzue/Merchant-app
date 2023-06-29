import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ArrowUp = ({
  color = '#000',
  size = 25,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19.28 19.28"
    height={size}
    width={size}>
    <Path
      d="M14,11.78l-3.44-3.85c-.51-.57-1.32-.57-1.84,0l-3.44,3.85"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);

export default ArrowUp;
