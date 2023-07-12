import React, { useState } from 'react';

import { useQueryClient } from 'react-query';

import useMutationWithToken from './useMutationWithToken';
import CustomAlert from '../components/utils/CustomAlert';
import setTokenAndRedirect from '../functions/setTokenAndRedirect';
import ExtendedAxiosError from '../types/ExtendedAxiosError';

const useAuthenticatedFormSubmit = (
  routeURL: string,
  setToken: boolean,
  onSuccess?: () => any
) => {
  const [alert, setAlert] = useState<React.ReactNode>();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutationWithToken(routeURL, false);
  const [loading, setLoading] = useState(isLoading);

  const handleSubmit = (data: any) => {
    mutate(
      { ...data },
      {
        onSuccess: async (response) => {
          queryClient.resetQueries();

          setAlert(<CustomAlert variant="success" text={response.message} />);

          setLoading(false);

          setTimeout(() => {
            onSuccess && onSuccess();
          }, 1000);

          if (setToken) {
            setTokenAndRedirect(response.token);
          }
        },
        onError: (err) => {
          const { response } = err as ExtendedAxiosError;

          setAlert(
            <CustomAlert variant="danger" text={response.data.message} />
          );
        }
      }
    );
  };

  return { alert, handleSubmit, isLoading: loading };
};

export default useAuthenticatedFormSubmit;
