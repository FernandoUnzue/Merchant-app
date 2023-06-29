export const errorHandler = (
  errorMapper: Record<string, string>,
  response?: any,
): string => {
  const { errorMessage } = response.response.data || response.data;

  const errorCode =
    errorMessage && Object.keys(errorMapper).includes(errorMessage)
      ? errorMessage
      : errorMapper.genericError;

  return errorMapper[errorCode];
};
