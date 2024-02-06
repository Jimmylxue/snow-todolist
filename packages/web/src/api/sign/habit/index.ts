import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { ClientError, post } from '../..';
import { EStatus, THabitDetail, TUserHabit } from './type';

export function useUserHabit(
  queryKey: QueryKey,
  variable: {
    status: EStatus;
  },
  config?: UseQueryOptions<
    {
      code: number;
      message: number;

      result?: TUserHabit[];
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      message: number;

      result?: TUserHabit[];
    },
    ClientError
  >(queryKey, () => post('/checkIn/clist', variable), config);
}

export function useHabitDetail(
  queryKey: QueryKey,
  variable: {
    habitId: number;
    signYear: string;
    signMonth: string;
  },
  config?: UseQueryOptions<
    {
      code: number;
      message: number;
      result?: THabitDetail;
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      message: number;
      result?: THabitDetail;
    },
    ClientError
  >(queryKey, () => post('/checkIn/detail', variable), config);
}
