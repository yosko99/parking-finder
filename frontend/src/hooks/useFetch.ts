import axios from 'axios';
import { useAtom } from 'jotai';
import { useQuery } from 'react-query';

import tokenAtom from '../atoms/token.atom';

interface ReturnTypes {
  error: Error | undefined;
  isLoading: boolean;
  data: any;
  refetch: () => void;
}

const useFetch = (
  queryKey: string | string[],
  url: string,
  fetchOnLoad: boolean,
  includeToken: boolean
): ReturnTypes => {
  const [token] = useAtom(tokenAtom);

  const getData = async () => {
    return await axios
      .get(
        url,
        includeToken
          ? {
              headers: { authorization: 'Bearer ' + token }
            }
          : {}
      )
      .then((response) => response.data);
  };

  const { isLoading, error, isError, data, refetch } = useQuery(
    queryKey,
    () => getData(),
    {
      enabled: fetchOnLoad
    }
  );

  return {
    isLoading,
    error: isError ? (error as Error) : undefined,
    data,
    refetch
  };
};

export default useFetch;
