import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import { useMutation } from 'react-query';

import tokenAtom from '../atoms/token.atom';
import RequestType from '../types/RequestType';

const useMutationWithToken = (
  routeURL: string,
  requestType: RequestType,
  onMutate?: () => any
) => {
  const [token] = useAtom(tokenAtom);

  const mutate = async (data: any) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let response: AxiosResponse;

    switch (requestType) {
      case 'post':
      case 'put':
        response = await axios[requestType](routeURL, data, config);
        break;
      case 'delete':
        response = await axios.delete(routeURL, config);
        break;
    }

    return response.data;
  };

  return useMutation(mutate, { onMutate: onMutate && onMutate });
};

export default useMutationWithToken;
