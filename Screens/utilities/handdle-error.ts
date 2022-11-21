export const getReasonErrorMessage = (errors: Array<any>) => {
  return errors[0]?.reason || '';
};

export const handleBackendError = (errors: Array<any>, startFrom?: string) => {
  // getErrorData(errors);
  const reasonMessage = getReasonErrorMessage(errors);

  console.log('ERROR', reasonMessage);
};
