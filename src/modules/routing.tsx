import { FC, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UnloggedStack } from './unlogged';
import { BottomTabNavigator } from './unlogged/tabs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@core/redux/store';
import { navigationRef } from '@core/helpers/RootNavigation';
import * as RootNavigation from '@core/helpers/RootNavigation';
import { ModalToken } from '@components/TokenExpiredModal/';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogOutAsync } from '@core/redux/authSlice/authSlice';
import Loading from '@components/Loading';
import {
  biometricAuth,
  checkBiometric,
  refresToken,
} from '@core/helpers/utils';
import { useCheckAuthMutation } from '@core/redux/Api/endpoints/Auth';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

/**
 * Deep Linking
 */

const PREFIXES = ['mia-world://'];

const LINKING_DEFAULT_CONFIG_UNLOGGED = {
  prefixes: PREFIXES,
  config: {
    screens: {
      ResetEnterNewPassword: {
        path: 'reset-password/:phone/:code',
        parse: {
          phone: (phone: string) => `${phone}`,
          code: (code: string) => `${code}`,
        },
      },
    },
  },
};

/**
 * RootNavigator
 */

export const RootNavigator: FC = () => {
  const user = useSelector((state: RootState) => state.auth);
  //  console.log('auth: ' + user.loggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const [checkAuth, { isLoading }] = useCheckAuthMutation();

  const [error, setError] = useState<{ isError: boolean; message: string }>({
    isError: false,
    message: '',
  });

  const resetError = () => {
    setTimeout(() => {
      setError({
        isError: false,
        message: '',
      });
    }, 5000);
  };

  const [loadingBiometric, setLoadingBiometric] = useState<boolean>(
    user.loggedIn ? true : false,
  );
  const checkSession = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      await checkAuth({ token: token })
        .unwrap()
        .then(() => {
          // console.log('de lujo'+response)
          setLoadingBiometric(false);
        })
        .catch(error => {
          console.log('error: ' + error);
          setError({
            isError: true,
            message: 'Error validating session',
          });
          resetError();
          setLoadingBiometric(false);
          refresToken();
          checkSession();
        });
    } else {
      setError({
        isError: true,
        message: 'No token found',
      });
      resetError();
      dispatch(LogOutAsync());
      setLoadingBiometric(false);
    }
  };

  const checkUserSessionNew = async (rnBiometrics: ReactNativeBiometrics) => {
    if (user.loggedIn) {
      // if is available sensors
      const bioAvailable = await checkBiometric(rnBiometrics);
      if (bioAvailable) {
        // if biometric is successfull
        const signBio = await biometricAuth(rnBiometrics);
        if (!signBio) {
          setError({
            isError: true,
            message: 'user cancelled biometric prompt',
          });
          resetError();
          console.log('user cancelled biometric prompt');
          dispatch(LogOutAsync());
          setLoadingBiometric(false);
        } else {
          console.log('successful biometrics provided');
          setLoadingBiometric(false);
        }
      } else {
        setLoadingBiometric(false);
      }
    } else {
      setError({
        isError: true,
        message: 'User not logged in',
      });
      resetError();
      dispatch(LogOutAsync());
      setLoadingBiometric(false);
    }
  };

  const checkUserSession = async (rnBiometrics: ReactNativeBiometrics) => {
    setTimeout(() => {
      if (user.loggedIn === false) {
        setError({
          isError: true,
          message: 'time out session init 60 secs',
        });
        resetError();
        console.log('time aout 60 segundos');
        dispatch(LogOutAsync());
        setLoadingBiometric(false);
      }
    }, 60000);
    if (user.loggedIn) {
      // if is available sensors
      const bioAvailable = await checkBiometric(rnBiometrics);
      if (bioAvailable) {
        // if biometric is successfull
        const signBio = await biometricAuth(rnBiometrics);
        if (signBio) {
          console.log('successful biometrics provided');
          checkSession();
        } else {
          setError({
            isError: true,
            message: 'user cancelled biometric prompt',
          });
          resetError();
          console.log('user cancelled biometric prompt');
          dispatch(LogOutAsync());
          setLoadingBiometric(false);
        }
      } else {
        checkSession();
      }
    } else {
      setError({
        isError: true,
        message: 'User not logged in',
      });
      resetError();
      dispatch(LogOutAsync());
      setLoadingBiometric(false);
    }
  };
  //  console.log('user: ' + user.user);
  useEffect(() => {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });
    checkUserSessionNew(rnBiometrics);
  }, []);

  if (loadingBiometric) {
    return <Loading error={error.isError ? error.message : undefined} />;
  }
  return (
    <>
      <NavigationContainer
        linking={LINKING_DEFAULT_CONFIG_UNLOGGED}
        ref={navigationRef}>
        {user.loggedIn ? (
          <BottomTabNavigator RootNavigation={RootNavigation} />
        ) : (
          <UnloggedStack RootNavigation={RootNavigation} />
        )}
      </NavigationContainer>
      <ModalToken show={user.showModal} />
    </>
  );
};
