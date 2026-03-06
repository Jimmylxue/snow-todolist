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
import { ClientError, post } from '../..';

export function useTaskType(
  queryKey: QueryKey,
  variable: {},
  config?: UseQueryOptions<
    {
      code: number;
      message: string;
      result?: TaskType[];
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      message: string;
      result?: TaskType[];
    },
    ClientError
  >(queryKey, () => post('/taskType/list', variable), config);
}

export function useTaskTypeDetail(
  queryKey: QueryKey,
  variable: { typeId: number },
  config?: UseQueryOptions<
    {
      code: number;
      message: string;
      result?: TaskType;
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      message: string;
      result?: TaskType;
    },
    ClientError
  >(queryKey, () => post('/taskType/detail', variable), config);
}

export function useAddTaskType(
  options?: UseMutationOptions<
    {
      code: number;
      message: string;
    },
    ClientError,
    TAddTaskTypeParams
  >,
) {
  return useMutation<
    {
      code: number;
      message: string;
    },
    ClientError,
    TAddTaskTypeParams
  >((data) => post('taskType/add', data), options);
}

export function useUpdateTaskType(
  options?: UseMutationOptions<
    {
      code: number;
      message: string;
    },
    ClientError,
    TUpdateTaskTypeParams
  >,
) {
  return useMutation<
    {
      code: number;
      message: string;
    },
    ClientError,
    TUpdateTaskTypeParams
  >((data) => post('taskType/update', data), options);
}

export function useDelTaskType(
  options?: UseMutationOptions<
    {
      code: number;
      message: string;
    },
    ClientError,
    TDelTaskTypeParams
  >,
) {
  return useMutation<
    {
      code: number;
      message: string;
    },
    ClientError,
    TDelTaskTypeParams
  >((data) => post('taskType/del', data), options);
}
