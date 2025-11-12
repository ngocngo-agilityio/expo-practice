// Libs
import { useEffect, useState } from 'react';

export const useErrorAPI = (errorMessage: string) => {
  const [errorAPI, setErrorAPI] = useState('');

  useEffect(() => {
    if (errorMessage) {
      setErrorAPI(errorMessage);
    }
  }, [errorMessage]);

  return {
    errorAPI,
    setErrorAPI,
    clearErrorAPI: () => setErrorAPI(''),
  };
};
