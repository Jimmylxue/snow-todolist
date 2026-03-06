import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import { ClientError, post } from '../..';
import {
  TAddTaskParams,
  TDelTaskParams,
  TSearchTaskParams,
  TUpdateTaskParams,
  TUpdateTaskStatusParams,
  TUserTaskList,
  TaskItem,
} from './type';

export function useUserTask(
  queryKey: QueryKey,
  variable: {
    page: number;
    pageSize: number;
    typeId?: number;
    startTime?: number;
    endTime?: number;
    status?: number;
    filterType?: 1 | 2;
  },
  config?: UseQueryOptions<
    {
      code: number;
      message: string;
      result?: TUserTaskList;
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      message: string;
      result?: TUserTaskList;
    },
    ClientError
  >(queryKey, () => post('/task/list', variable), config);
}

export function useTaskDetail(
  queryKey: QueryKey,
  variable: { taskId: number },
  config?: UseQueryOptions<
    {
      code: number;
      message: string;
      result?: TaskItem;
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      message: string;
      result?: TaskItem;
    },
    ClientError
  >(queryKey, () => post('/task/detail', variable), config);
}

export function useAddTask(
  options?: UseMutationOptions<
    {
      code: number;
      message: string;
    },
    ClientError,
    TAddTaskParams
  >,
) {
  return useMutation<
    {
      code: number;
      message: string;
    },
    ClientError,
    TAddTaskParams
  >((data) => post('task/add', data), options);
}

export function useUpdateTaskStatus(
  options?: UseMutationOptions<
    {
      code: number;
      message: string;
    },
    ClientError,
    TUpdateTaskStatusParams
  >,
) {
  return useMutation<
    {
      code: number;
      message: string;
    },
    ClientError,
    TUpdateTaskStatusParams
  >((data) => post('task/updateStatus', data), options);
}

export function useUpdateTask(
  options?: UseMutationOptions<
    {
      code: number;
      message: string;
    },
    ClientError,
    TUpdateTaskParams
  >,
) {
  return useMutation<
    {
      code: number;
      message: string;
    },
    ClientError,
    TUpdateTaskParams
  >((data) => post('task/update', data), options);
}

export function useDelTask(
  options?: UseMutationOptions<
    {
      code: number;
      message: string;
    },
    ClientError,
    TDelTaskParams
  >,
) {
  return useMutation<
    {
      code: number;
      message: string;
    },
    ClientError,
    TDelTaskParams
  >((data) => post('task/del', data), options);
}

export function useSearchTask(
  queryKey: QueryKey,
  variable: TSearchTaskParams,
  config?: UseQueryOptions<
    {
      code: number;
      message: string;
      result?: TUserTaskList;
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      message: string;
      result?: TUserTaskList;
    },
    ClientError
  >(queryKey, () => post('/task/search', variable), config);
}
