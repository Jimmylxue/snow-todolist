import { ClientError } from '@/api/location';
import { UseMutationOptions, useMutation } from 'react-query';
import {
  TUpdateTaskParams,
  TUserLoginParams,
  TUserRegisterParams,
} from './type';
import { post } from '..';

export type TLoginUser = {
  id: number;
  username: string;
  avatar: string;
  sex: 1 | 0;
  phone: string;
  createTime: string;
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
