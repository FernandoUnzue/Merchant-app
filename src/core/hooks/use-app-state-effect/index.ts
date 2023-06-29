import { useRef, useEffect } from 'react';
import { AppStateStatus, AppState } from 'react-native';

type CallbackAppState = (status: AppStateStatus) => void;

export const useAppStateEffect = (callback: CallbackAppState): void => {
  const callbackRef = useRef<CallbackAppState>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleAppSate = (appState: AppStateStatus): void => {
      callbackRef.current(appState);
    };

    const subscription = AppState.addEventListener('change', handleAppSate);

    return () => subscription.remove();
  }, []);
};
