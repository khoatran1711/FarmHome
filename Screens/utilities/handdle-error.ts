export const getReasonErrorMessage = (errors: Array<any>) => {
  return errors[0]?.reason || '';
};

export const handleBackendError = (errors: Array<any>, startFrom?: string) => {
  // getErrorData(errors);
  const reasonMessage = getReasonErrorMessage(errors);

  console.log('ERROR', reasonMessage);
};

export interface ErrorHandler {
  isError: boolean;
  message: string;
}

export const setError = (check: boolean, mess: string): ErrorHandler => {
  return {
    isError: check,
    message: mess,
  };
};
