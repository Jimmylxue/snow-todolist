import { UseMutationOptions, useMutation } from 'react-query';
import {
  TUpdateTaskParams,
  TUserLoginByMailParams,
  TUserLoginParams,
  TUserRegisterByMailParams,
  TUserRegisterParams,
} from './type';
import { ClientError, post } from '..';

export type TLoginUser = {
  id: number;
  username: string;
  avatar: string;
  sex: 1 | 0;
  phone: string;
  createTime: string;
  mail: string;
};

export function useUserLogin(
  options?: UseMutationOptions<
    {
      code: number;
      result: {
        token: string;
        user: TLoginUser;
      };
    },
    ClientError,
    TUserLoginParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: {
        token: string;
        user: TLoginUser;
      };
    },
    ClientError,
    TUserLoginParams
  >((data) => post('user/login', data), options);
}

export function useUserLoginByMail(
  options?: UseMutationOptions<
    {
      code: number;
      result: {
        token: string;
        user: TLoginUser;
      };
    },
    ClientError,
    TUserLoginByMailParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: {
        token: string;
        user: TLoginUser;
      };
    },
    ClientError,
    TUserLoginByMailParams
  >((data) => post('user/login_by_mail', data), options);
}

export function useUserRegister(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUserRegisterParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUserRegisterParams
  >((data) => post('user/register', data), options);
}

export function useUserRegisterByMail(
  options?: UseMutationOptions<
    {
      code: number;
      result: {
        token: string;
        user: TLoginUser;
      };
    },
    ClientError,
    TUserRegisterByMailParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: {
        token: string;
        user: TLoginUser;
      };
    },
    ClientError,
    TUserRegisterByMailParams
  >((data) => post('user/register_by_mail', data), options);
}

export function useSendMail(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    { mail: string }
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    { mail: string }
  >((data) => post('mail/send_verification_code', data), options);
}

export function useUpdateTask(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUpdateTaskParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUpdateTaskParams
  >((data) => post('task/update', data), options);
}
