export interface RegisterDto {
  email: string;
  name: string;
  password: string;
  isCompany: boolean;
}

export const defaultRegisterDtoValues: RegisterDto = {
  email: '',
  isCompany: false,
  name: '',
  password: ''
};
