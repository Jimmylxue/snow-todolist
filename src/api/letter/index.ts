import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import { ClientError, post } from '..';
import { EReadStatus, TUserLetter } from './type';

export function useUserLetter(
  queryKey: QueryKey,
  variable: {
    platform: number;
  },
  config?: UseQueryOptions<
    {
      code: number;
      message: number;

      result?: TUserLetter[];
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      message: number;
      result?: TUserLetter[];
    },
    ClientError
  >(queryKey, () => post('/letter/user/record', variable), config);
}

export function useReadLetter(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    {
      recordId: number;
      status: EReadStatus;
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
      recordId: number;
      status: EReadStatus;
    }
  >((data) => post('/letter/user/read', data), options);
}
