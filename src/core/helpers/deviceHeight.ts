import { StatusBar, Dimensions } from 'react-native';

/*
guideline height for standard 5" device screen is 680,
it could be 667 as well. Modify if needed.
*/
const STANDARD_SCREEN_HEIGHT = 680;

const { height, width } = Dimensions.get('window');
// Standard length calculates the length of the device.
const standardLength: number = width > height ? width : height;

/*
 calculateOffSet() evaluates if the height of the phone is modified by the status bar which takes part of the screen that the app is not able to use.
 For iphone the statusBarHeight is generic and for other phones it is taken from statusBar.currentHeight.
*/
const calculateOffSet = (): number => {
  if (width > height || !StatusBar.currentHeight) {
    return 0;
  }
  return StatusBar.currentHeight;
};

// deviceHeight ultimately uses the function calculateOffSet and gives us the real height the app is using for the content.
const deviceHeight: number = standardLength - calculateOffSet();

export const isSmallDevice = (): boolean =>
  deviceHeight <= STANDARD_SCREEN_HEIGHT;


export const formatNumber = (num: number, fixed: number) => {
  var decimalPart;

  var array = Math.floor(num).toString().split("");
  var index = -3;
  while (array.length + index > 0) {
    array.splice(index, 0, ".");
    index -= 4;
  }

  if (fixed > 0) {
    decimalPart = num.toFixed(fixed).split(".")[1];
    return array.join("") + "," + decimalPart;
  }
  return array.join("");
};
