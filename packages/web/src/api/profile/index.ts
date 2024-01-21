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
