import { isValidPhoneNumber } from 'libphonenumber-js';

import { formatPhoneNumber } from './formatPhoneNumber';

export const validatePhoneNumber = (phone: string) =>
  isValidPhoneNumber(formatPhoneNumber(phone)) || 'Inserire un numero valido';
