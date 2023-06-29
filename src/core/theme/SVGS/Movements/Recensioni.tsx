import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const RecensioniIcon = ({
  color = '#000',
  size = 25,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 33 33"
    height={size}
    width={size}>
    <Path
      d="m20.33 11.4 2.49-.36 1.84-3.72a.5.5 0 0 1 .9 0l1.84 3.72 4.1.6c.19.03.35.16.41.34s0 .38-.13.52l-2.97 2.9.7 4.09a.511.511 0 0 1-.5.59c-.08 0-.16-.02-.23-.06l-3.91-2.05"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Path
      d="M11.21 25.96a.511.511 0 0 1-.5-.59l.98-5.71-4.15-4.04a.498.498 0 0 1-.13-.52c.06-.18.22-.31.41-.34l5.73-.83 2.56-5.2a.5.5 0 0 1 .45-.28h0a.5.5 0 0 1 .45.28l2.56 5.2 5.73.83c.19.03.35.16.41.34s0 .38-.13.52l-4.15 4.04.98 5.71c.03.19-.05.38-.2.49-.15.11-.36.13-.53.04l-5.13-2.7-5.13 2.7c-.07.04-.15.06-.23.06h.02Z"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Path
      d="m12.67 11.4-2.49-.36-1.84-3.72a.5.5 0 0 0-.9 0L5.6 11.04l-4.1.6c-.19.03-.35.16-.41.34s0 .38.13.52l2.97 2.9-.7 4.09a.511.511 0 0 0 .5.59c.08 0 .16-.02.23-.06l3.91-2.05"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);

export default RecensioniIcon;
