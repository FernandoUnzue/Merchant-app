import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
export function goBack(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}
export function addListener(name, callback) {
  if (navigationRef.isReady()) {
    navigationRef.addListener(name, callback);
  }
}
