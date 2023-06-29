import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export const useDisableGoBack = (callback?: () => boolean): void => {
  useEffect(() => {
    const backAction = callback || (() => true);
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => subscription.remove();
  }, [callback]);
};
