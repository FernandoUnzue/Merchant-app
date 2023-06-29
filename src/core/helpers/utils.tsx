import { Api, fetchApi } from '@core/clients/axioss';
import { ApiRedux } from '@core/redux/Api/api';
import { store } from '@core/redux/store';
import BelezaIcon from '@core/theme/SVGS/Category/BelezaIcon';
import BookIcon from '@core/theme/SVGS/Category/BookIcon';
import ClothingIcon from '@core/theme/SVGS/Category/ClothingIcon';
import CouponIcon from '@core/theme/SVGS/Category/CouponIcon';
import EnjoyIcon from '@core/theme/SVGS/Category/EnjoyIcon';
import FoodIcon from '@core/theme/SVGS/Category/FoodIcon';
import HolidayIcon from '@core/theme/SVGS/Category/HolidayIcon';
import InternetIcon from '@core/theme/SVGS/Category/InternetIcon';
import KidsIcon from '@core/theme/SVGS/Category/KidsIcon';
import OficinaIcon from '@core/theme/SVGS/Category/OficineIcon';
import PaintIcon from '@core/theme/SVGS/Category/PaintIcon';
import PerfumeIcon from '@core/theme/SVGS/Category/PerfumeIcon';
import PetsIcon from '@core/theme/SVGS/Category/PetsIcon';
import PhoneIcon from '@core/theme/SVGS/Category/PhoneIcon';
import PresentIcon from '@core/theme/SVGS/Category/PresentIcon';
import RingIcon from '@core/theme/SVGS/Category/RingIcon';
import SportIcon from '@core/theme/SVGS/Category/SportIcon';
import StoreIcon from '@core/theme/SVGS/Category/StoreIcon';
import TshirtIcon from '@core/theme/SVGS/Movements/TshirtIcon';
import PointsIcon from '@core/theme/SVGS/Vetrina/PointsIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { ReactNode, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import OneSignal from 'react-native-onesignal';
import { extendedApiAuth } from '@core/redux/Api/endpoints/Auth';
import ReactNativeBiometrics from 'react-native-biometrics';
import PharmacyIcon from '@core/theme/SVGS/Category/PharmacyIcon';
import EnergyIcon from '@core/theme/SVGS/Category/EnergyIcon';
import FinancialIcon from '@core/theme/SVGS/Category/FinancialIcon';
import AssuranceIcon from '@core/theme/SVGS/Category/Assurance';
import ElectronicIcon from '@core/theme/SVGS/Category/ElectronicsIcon';
import CarMotorBikeIcon from '@core/theme/SVGS/Category/CarMotorBikeIcon';

export const toFormData = (data: any) => {
  const formData = new FormData();

  if (data.image === '') {
    delete data.image;
  }

  Object.keys(data).forEach(key => {
    // if is array then we need to loop through the array and add each item to the form data
    if (Array.isArray(data[key])) {
      data[key].forEach((item: any) => {
        formData.append(`${key}[]`, item);
      });
    } else {
      formData.append(key, data[key]);
    }
  });
  console.log('formdata', formData);
  return formData;
};

export const renderIconCategory = (
  name: string | undefined,
  size: number,
  defaultIcon?: ReactNode,
): ReactNode => {
  switch (name?.toLowerCase()) {
    case 'ufficio e business':
      return <OficinaIcon size={size} styles={{ marginRight: 10 }} />;
    case 'gioielli e orologi':
      return <RingIcon size={size} styles={{ marginRight: 10 }} />;
    case 'cibi e bevande':
      return <FoodIcon size={size} styles={{ marginRight: 10 }} />;
    case 'intrattenimento':
      return <EnjoyIcon size={size} styles={{ marginRight: 10 }} />;
    case 'bambini e prima infanzia':
      return <KidsIcon size={size} styles={{ marginRight: 10 }} />;
    case 'abbigliamento e accessori':
      return <ClothingIcon size={size} styles={{ marginRight: 10 }} />;
    case 'software e internet':
      return <InternetIcon size={size} styles={{ marginRight: 10 }} />;
    case 'benessere salute e bellezza':
      return <BelezaIcon size={size} styles={{ marginRight: 10 }} />;
    case 'viaggi e vacanze':
      return <HolidayIcon size={size} styles={{ marginRight: 10 }} />;
    case 'megastore':
      return <StoreIcon size={size} styles={{ marginRight: 10 }} />;
    case 'idee regalo e cofanetti':
      return <PresentIcon size={size} styles={{ marginRight: 10 }} />;
    case 'telefonia':
      return <PhoneIcon size={size} styles={{ marginRight: 10 }} />;
    case 'articoli sportivi':
      return <SportIcon size={size} styles={{ marginRight: 10 }} />;
    case 'alimenti e prodotti per animali':
      return <PetsIcon size={size} styles={{ marginRight: 10 }} />;
    case 'libri e formazione':
      return <BookIcon size={size} styles={{ marginRight: 10 }} />;
    case 'buoni spesa':
      return <CouponIcon size={size} styles={{ marginRight: 10 }} />;
    case 'profumerie':
      return <PerfumeIcon size={size} styles={{ marginRight: 10 }} />;
    case 'casa giardino e fai da te':
      return <PaintIcon size={size} styles={{ marginRight: 10 }} />;
    case 'points':
      return <PointsIcon size={size} styles={{ marginRight: 10 }} />;
    case 'farmacie':
      return <PharmacyIcon size={size} styles={{ marginRight: 10 }} />;
    case 'energia e riscaldamento':
      return <EnergyIcon size={size} styles={{ marginRight: 10 }} />;
    case 'servizi finanziari':
      return <FinancialIcon size={size} styles={{ marginRight: 10 }} />;
    case 'assicurazioni':
      return <AssuranceIcon size={size} styles={{ marginRight: 10 }} />;
    case 'elettronica e informatica':
      return <ElectronicIcon size={size} styles={{ marginRight: 10 }} />;
    case 'auto e moto':
      return <CarMotorBikeIcon size={size} styles={{ marginRight: 10 }} />;
    default:
      return defaultIcon ? (
        defaultIcon
      ) : (
        <TshirtIcon size={size} styles={{ marginRight: 10 }} />
      );
  }
};

export const refreshTT = async (token: string | null) => {
  if (token) {
    const resp = await fetchApi({
      endpoint: '/oauth/token',
      method: 'POST',
      formData: true,
      _data: toFormData({
        grant_type: 'refresh_token',
        refresh_token: token,
      }),
      tokenUse: false,
    });

    return resp._response;
  }
};
export const tokeeeen = async () => {
  const token = await AsyncStorage.getItem('refresh_token');
  const result = await refreshTT(token);
  // console.log(`llego result ${result}`)
  const object = JSON.parse(result);
  // console.log(`objeto ${object.access_token}`)

  await AsyncStorage.setItem('token', object.access_token);
  await AsyncStorage.setItem('refresh_token', object.refresh_token);
  // const tokennn = await AsyncStorage.getItem('token')

  //  console.log(` acutal token ${tokennn}`)
};

export const refresToken = async () => {
  const token = await AsyncStorage.getItem('refresh_token');
  if (token)
    store.dispatch(
      extendedApiAuth.endpoints.refreshTokenFunc.initiate({
        grant_type: 'refresh_token',
        refresh_token: token,
      }),
    );
};

export const sendOnesignalId = async () => {
  try {
    const resp1 = await Api({ endpoint: '/api/user', tokenUse: true });

    if (resp1.status === 200) {
      const { username } = resp1.data;
      OneSignal.setExternalUserId(username, results => {
        // The results will contain push and email success statuses
        console.log('Results of setting external user id');
        console.log(results);
      });
      const resp = await Api({
        endpoint: '/api/user/onesignal',
        method: 'PUT',
        tokenUse: true,
        _data: {
          oneSignalId: username,
        },
      });
      if (resp.status === 200) {
        console.log('successfully upload onesignal id');
      }
    }
  } catch (error) {
    console.log('error onesignal request');
  }
};

// check is sensor available
export const checkBiometric = async (rnBiometrics: ReactNativeBiometrics) => {
  const { available } = await rnBiometrics.isSensorAvailable();
  return available;
};

// call auth biometric
export const biometricAuth = async (
  rnBiometrics: ReactNativeBiometrics,
  customMessage = 'Confirm fingerprint',
) => {
  try {
    const { success } = await rnBiometrics.simplePrompt({
      promptMessage: customMessage,
    });
    if (success) {
      console.log('biometrics successfully');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('biometrics failed', error);
    return false;
  }
};

const ITALY_PHONE_CODE = '54';

export const PASSWORD_REGEX: any =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^.&+=])\S{8,32}$/;
export const ALPHANUMERIC_REGEX: any = /^[a-zA-Z0-9]*$/;
export const NUMBERS_REGEX: any = /\d/;
// export const NUMBERS_REGEX: any = /^[0-9,$]*$/;
export const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
// export const phone = /^\d{12}$/;
// export const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]*$/;

export const phone = /(\+54|39)?[ -]*(6|7)[ -]*([0-9][ -]*){12-13}/;
export const password =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&.+=])\S{8,32}$/;
export const userSchema = yup.object().shape({
  phone: yup.string().required(),
  password: yup.string().matches(password).required(),
  rPassword: yup.string().oneOf([yup.ref('password')]),
  codiceAmico: yup.string(),
  tycAccepted: yup.bool().isTrue().required(),
});

export const personalDataSchema = yup.object().shape({
  firsNname: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().matches(regexEmail).required(),
  rEmail: yup.string().oneOf([yup.ref('email')]),
  birthDate: yup.string().required(),
  provinceCode: yup.string().required(),
  privacyThirdPartner: yup.bool().isTrue(),
});

export const reduceArray = (arr: any[]) => {
  return arr.reduce((unique, o) => {
    if (
      !unique.some((obj: any) => obj.label === o.label && obj.value === o.value)
    ) {
      unique.push(o);
    }
    return unique;
  }, []);
};
