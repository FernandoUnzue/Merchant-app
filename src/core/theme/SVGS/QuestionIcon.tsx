import * as React from "react";
import { ViewStyle } from "react-native";
import Svg, { SvgProps, Circle, Text, TSpan } from "react-native-svg";
const QuestionIcon = ({
    color = '#35aeb1',
    size = 25,
    styles
  }: {
    color?: string;
    size?: number;
    styles?: ViewStyle
  }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.78 15.22" 
  
  width={size}
  height={size}
  style={{
    ...styles
  }}
  
  >
    <Circle
      cx={7.39}
      cy={7.39}
      r={6.89}
      style={{
        fill: "none",
        stroke: color,
        strokeMiterlimit: 10,
      }}
    />
    <Text
      transform="translate(5.76 10.37)"
      style={{
        fill: color,
        fontFamily: "Poppins-Bold,Poppins",
        fontSize: 8,
        letterSpacing: 0,
      }}
    >
      <TSpan x={0} y={0}>
        {"?"}
      </TSpan>
    </Text>
  </Svg>
);
export default QuestionIcon;
