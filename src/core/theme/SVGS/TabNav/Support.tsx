import * as React from 'react';
import Svg, { SvgProps, Path, G, Circle } from 'react-native-svg';

const SupportIcon = ({
  size = 25,
  color = '#000',
}: {
  size?: number;
  color?: string;
}) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 31.8 29.26"
    height={size}
    width={size}>
    <Path
      d="M2.55,27.09H29.25c-.37-3.58-.62-4.03-.72-4.19-.95-1.25-3.13-2.39-7.46-3.89v.23c0,3.21-2.64,4.88-5.23,4.88-2.6,0-5.23-1.68-5.23-4.89v-.18c-4.28,1.49-6.43,2.63-7.37,3.88-.08,.12-.33,.5-.71,4.17Z"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <G>
      <Path
        d="M9.15,13.55c-.24-.12-1.03-.69-1.16-2.96-.04-.72,.18-1.02,.41-1.33,.19-.26,.41-.56,.43-1.02,.2-3.65,1.48-6.08,7.08-6.08,4.73,0,6.85,1.82,7.08,6.08,.03,.46,.23,.76,.42,1.02,.21,.31,.41,.6,.42,1.26v.06c-.1,.89-.24,2.11-.68,2.7-.33,.43-.64,.68-1.08,1.04-1.32,1.09-2.23,1.69-4.72,1.79"
        style={{
          fill: 'none',
          stroke: color,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
      <Circle
        cx={16.22}
        cy={16.11}
        r={1.03}
        style={{
          fill: 'none',
          stroke: color,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
    </G>
  </Svg>
);

export default SupportIcon;
