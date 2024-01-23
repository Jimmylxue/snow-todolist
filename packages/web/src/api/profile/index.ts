import { UseMutationOptions, useMutation } from 'react-query';
import { ClientError, post } from '..';
import { TLoginUser } from '../login';

export function useUpdateUser(
  options?: UseMutationOptions<
    {
      code: number;
      result: TLoginUser;
    },
    ClientError,
    TLoginUser
  >,
) {
  return useMutation<
    {
      code: number;
      result: TLoginUser;
    },
    ClientError,
    TLoginUser
  >((data) => post('user/update', data), options);
}

export function useUpdateUserPhone(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    {
      phone?: string;
      newPhone: string;
    }
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    {
      phone?: string;
      newPhone: string;
    }
  >((data) => post('user/update_phone', data), options);
}

export function useUpdateUserMail(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    {
      mail?: string;
      newMail: string;
      code: string;
    }
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    {
      mail?: string;
      newMail: string;
      code: string;
    }
  >((data) => post('user/update_mail', data), options);
}
