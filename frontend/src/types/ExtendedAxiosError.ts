import { AxiosError } from 'axios';

type ExtendedAxiosError = AxiosError & {
  response: { data: { message: string } };
};

export default ExtendedAxiosError;
