import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const StarIcon = ({
  color = '#88dada',
  size = 25,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28.59 27.36"
    width={size}
    height={size}>
    <Path
      d="m15.83.95 3.49 7.08 7.81 1.14c1.4.2 1.96 1.93.95 2.92l-5.65 5.5 1.34 7.78c.24 1.41-1.24 2.45-2.48 1.8l-6.98-3.67-6.98 3.67c-1.24.66-2.72-.4-2.48-1.8l1.34-7.78-5.67-5.51c-1.02-.99-.45-2.72.95-2.92l7.81-1.14L12.76.95c.63-1.28 2.44-1.26 3.07 0Z"
      style={{
        fill: color,
      }}
    />
  </Svg>
);

export default StarIcon;
