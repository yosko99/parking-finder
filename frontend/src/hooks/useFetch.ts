import axios from 'axios';
import { useQuery } from 'react-query';

interface ReturnTypes {
  error: Error | undefined;
  isLoading: boolean;
  data: any;
  refetch: () => void;
}

const useFetch = (
  queryKey: string | string[],
  url: string,
  fetchOnLoad: boolean
): ReturnTypes => {
  const getData = async () => {
    return await axios.get(url).then((response) => response.data);
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
