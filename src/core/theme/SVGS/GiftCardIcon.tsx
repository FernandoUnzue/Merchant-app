import * as React from "react";
import { ViewStyle } from "react-native";
import Svg, { Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */
const GiftCardIcon = ({
    color = '#88dad4',
    size = 25,
    styles
  }: {
    color?: string;
    size?: number;
    styles?: ViewStyle
  }) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 49.94 40.6"
   width={size}
   height={size}
   style={{
    ...styles
   }}
  >
    <Defs></Defs>
    <Path
     style={{
        fill: color
     }}
      d="m15.39 10.89 9.07 3.55c.16.06.33.1.5.1.17 0 .34-.03.5-.1l9.07-3.55a5.68 5.68 0 0 0 3.42-6.74 5.45 5.45 0 0 0-1.39-2.43l-.07-.07-.07-.07C35.72.91 34.9.44 33.98.2a5.68 5.68 0 0 0-6.74 3.42L24.95 9.5l-2.29-5.88A5.68 5.68 0 0 0 15.92.2c-.92.24-1.74.71-2.44 1.38l-.07.07-.07.07c-.67.7-1.14 1.51-1.39 2.43-.23.86-.25 1.78-.06 2.66.4 1.86 1.7 3.39 3.48 4.08Zm14.33-6.31v-.02a3.053 3.053 0 0 1 2.85-1.93c.76 0 1.48.29 2.05.84l.04.04.04.04c.7.73.98 1.71.77 2.71-.22.99-.91 1.81-1.86 2.18h-.01l-6.89 3.03 3.02-6.88ZM15.25 3.54l.04-.04.04-.04c.57-.55 1.29-.84 2.05-.84a3.038 3.038 0 0 1 2.84 1.93v.02l3.03 6.88-6.89-3.03h-.01a3.038 3.038 0 0 1-1.86-2.18c-.22-.99.06-1.98.77-2.71ZM0 13.46s.03.09.04.13c4.05.4 3.37 2.69 3.69 5.98 0 .02.01.04.03.06.02.02.03.03.05.04.04.01.08.01.1 0 .07-.05.15-.11.23-.18.2-.68.35-1.33.74-1.93.63-.94 1.47-1.73 2.46-2.27 1.04-.57 2.22-.88 3.41-.88l11.76.13c-2.16-1.11-10.52-4.15-11.26-4.39-3.75-1.22-9.69.62-11.26 3.31Zm38.67-3.31c-.74.24-9.11 3.28-11.26 4.39l11.76-.13c1.2 0 2.38.3 3.41.88.98.54 1.83 1.33 2.46 2.27.4.59.55 1.25.74 1.93.09.07.16.13.23.18.03.02.06.02.1 0 .02 0 .03-.02.05-.04.02-.02.03-.04.03-.06.33-3.29-.36-5.57 3.69-5.98.01-.04.03-.09.04-.13-1.57-2.69-7.51-4.52-11.26-3.31Z"
    />
    <Path
       style={{
        fill: color
     }}
      d="M40.46 17.21H27.63v2.15h12.83c.51 0 .93.42.93.93v2.41H27.63v4.54h13.76v9.62c0 .51-.42.93-.93.93H27.63v2.15h12.83c1.7 0 3.08-1.38 3.08-3.08V20.29c0-1.7-1.38-3.08-3.08-3.08ZM6.4 20.29v16.57c0 1.7 1.38 3.08 3.08 3.08h12.83v-2.15H9.48c-.51 0-.93-.42-.93-.93v-9.62h13.76V22.7H8.55v-2.41c0-.51.42-.93.93-.93h12.83v-2.15H9.48c-1.7 0-3.08 1.38-3.08 3.08Z"
    />
    <Path
       style={{
        fill: color
     }}
      d="M9.74 28.52h4.54v3.34H9.74zm25.79 6.17a2.475 2.475 0 0 0 3.88-2.03c0-1.36-1.11-2.47-2.47-2.47-1.09 0-2.01.7-2.34 1.68h-.13a1.609 1.609 0 1 0 0 3.22c.41 0 .78-.15 1.06-.4Zm-12.3-18.4h3.47v24.32h-3.47z"
    />
  </Svg>
);
export default GiftCardIcon;
