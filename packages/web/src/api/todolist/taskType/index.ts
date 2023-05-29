import { ClientError } from '@/api/location';
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import {
  TAddTaskTypeParams,
  TDelTaskTypeParams,
  TUpdateTaskTypeParams,
  TaskType,
} from './type';
import { post } from '../..';

export function useTaskType(
  queryKey: QueryKey,
  variable: {
    userId: number;
  },
  config?: UseQueryOptions<
    {
      code: number;
      result?: TaskType[];
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      result?: TaskType[];
    },
    ClientError
  >(queryKey, () => post('/taskType/list', variable), config);
}

export function useAddTaskType(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TAddTaskTypeParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TAddTaskTypeParams
  >((data) => post('taskType/add', data), options);
}

export function useUpdateTaskType(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUpdateTaskTypeParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUpdateTaskTypeParams
  >((data) => post('taskType/update', data), options);
}

export function useDelTaskType(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TDelTaskTypeParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TDelTaskTypeParams
  >((data) => post('taskType/del', data), options);
}
