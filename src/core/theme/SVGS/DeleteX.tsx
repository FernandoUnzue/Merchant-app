import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Text, TSpan, G, Ellipse } from 'react-native-svg';
const DeleteXIcon = ({
  color = '#ffc402',
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
    viewBox="0 0 34.33 36.886">
    <Text
      transform="translate(9.289 26)"
      fill={color}
      fontSize={25}
      fontFamily="IBMPlexMono-Bold, IBM Plex Mono"
      fontWeight={700}>
      <TSpan x={0} y={0}>
        {'x'}
      </TSpan>
    </Text>
    <G
      data-name="Ellisse 17"
      transform="translate(0 3.484)"
      fill="none"
      stroke={color}
      strokeWidth={2}>
      <Ellipse cx={17.165} cy={16.701} rx={17.165} ry={16.701} stroke="none" />
      <Ellipse cx={17.165} cy={16.701} rx={16.165} ry={15.701} />
    </G>
  </Svg>
);
export default DeleteXIcon;
