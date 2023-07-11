import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import { useMutation } from 'react-query';

import tokenAtom from '../atoms/token.atom';

const useMutationWithToken = (
  routeURL: string,
  updateRequest: boolean,
  onMutate?: () => any
) => {
  const [token] = useAtom(tokenAtom);

  const uploadPost = async (data: any) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let response: AxiosResponse<any, any>;
    if (!updateRequest) {
      response = await axios.post(routeURL, data, config);
    } else {
      response = await axios.put(routeURL, data, config);
    }
    return response.data;
  };

  return useMutation(uploadPost, { onMutate: onMutate && onMutate });
};

export default useMutationWithToken;
