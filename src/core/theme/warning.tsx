import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19.23 19.23"
    width={24}
    height={24}
    {...props}>
    <Circle
      cx={9.61}
      cy={9.61}
      r={9.14}
      style={{
        fill: 'none',
        strokeLinecap: 'round',
        stroke: '#000',
        strokeLinejoin: 'round',
        strokeWidth: '.95px',
      }}
    />
    <Path
      style={{
        fill: 'none',
        stroke: '#000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
      d="M9.61 5.14v5.42"
    />
    <Circle cx={9.61} cy={13.15} style={{ fill: '#000' }} r={0.94} />
  </Svg>
);

export default SvgComponent;
