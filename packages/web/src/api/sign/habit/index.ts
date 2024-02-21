import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import { ClientError, post } from '../..';
import {
  EStatus,
  TAddHabit,
  TEditHabit,
  THabitDetail,
  TUserHabit,
} from './type';

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

export type TUpdateSignParams = {
  habitId: number;
  signDate: string;
};

/**
 * 更新打卡
 */
export function useUpdateSign(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUpdateSignParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUpdateSignParams
  >((data) => post('/checkIn/sign', data), options);
}

/**
 * 添加打卡习惯
 */
export function useAddHabit(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TAddHabit
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TAddHabit
  >((data) => post('/habit/add', data), options);
}

/**
 * 更新打卡习惯
 */
export function useEditHabit(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TEditHabit
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TEditHabit
  >((data) => post('/habit/update', data), options);
}
