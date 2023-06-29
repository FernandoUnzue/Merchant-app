const ITALY_PHONE_CODE = '39';

export const formatPhoneNumber = (phone: string) => {
  // TODO: remove next `if` when Argentina phones are not allowed
  if (phone.startsWith('+54')) {
    return phone;
  }

  if (
    phone.length > 1 &&
    !phone.startsWith('+') &&
    !phone.startsWith(ITALY_PHONE_CODE)
  ) {
    return `+${ITALY_PHONE_CODE}${phone}`;
  }

  if (!phone.startsWith('+')) {
    return `+${phone}`;
  }

  return phone;
};
