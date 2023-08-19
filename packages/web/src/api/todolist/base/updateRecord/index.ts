import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { TCommitList } from './type';
import { ClientError, post } from '@/api/index';

export function useUpdateRecord(
  queryKey: QueryKey,
  variable: {
    user: string;
    repos: string;
    branch: string;
    startTime: string;
  },
  config?: UseQueryOptions<
    {
      code: number;
      message: number;
      result?: TCommitList;
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      message: number;
      result?: TCommitList;
    },
    ClientError
  >(queryKey, () => post('/base/UpdateRecord', variable), config);
}
