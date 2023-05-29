import { ClientError } from '@/api/location';
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import { post } from '../..';
import {
  TAddTaskParams,
  TDelTaskParams,
  TSearchTaskParams,
  TUpdateTaskParams,
  TUpdateTaskStatusParams,
  TUserTaskList,
} from './type';

export function useUserTask(
  queryKey: QueryKey,
  variable: {
    userId: number;
    page: number;
    pageSize: number;
    typeId?: number;
    startTime?: number;
    endTime?: number;
    status?: number;
  },
  config?: UseQueryOptions<
    {
      code: number;
      message: number;

      result?: TUserTaskList;
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      message: number;

      result?: TUserTaskList;
    },
    ClientError
  >(queryKey, () => post('/task/list', variable), config);
}

export function useAddTask(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TAddTaskParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TAddTaskParams
  >((data) => post('task/add', data), options);
}

export function useUpdateTaskStatus(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUpdateTaskStatusParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUpdateTaskStatusParams
  >((data) => post('task/updateStatus', data), options);
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

export function useDelTask(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TDelTaskParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TDelTaskParams
  >((data) => post('task/del', data), options);
}

export function useSearchTask(
  options?: UseMutationOptions<
    {
      code: number;
      result: TUserTaskList;
    },
    ClientError,
    TSearchTaskParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: TUserTaskList;
    },
    ClientError,
    TSearchTaskParams
  >((data) => post('task/search', data), options);
}
