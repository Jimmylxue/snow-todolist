import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import { ClientError, post } from '../..';
import {
  AdminTriggerDto,
  AdminTriggerPayload,
  RecordsListDto,
  RecordsListPayload,
  RunsListDto,
  RunsListPayload,
  SettingPayload,
  UpdateSettingDto,
} from './type';

export function useGetSetting(
  queryKey: QueryKey,
  config?: UseQueryOptions<
    {
      code: number;
      message: string;
      result?: SettingPayload;
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      message: string;
      result?: SettingPayload;
    },
    ClientError
  >(queryKey, () => post('/todo-notice/setting/get', {}), config);
}

export function useUpdateSetting(
  options?: UseMutationOptions<
    {
      code: number;
      message: string;
      result: boolean;
    },
    ClientError,
    UpdateSettingDto
  >,
) {
  return useMutation<
    {
      code: number;
      message: string;
      result: boolean;
    },
    ClientError,
    UpdateSettingDto
  >((data) => post('/todo-notice/setting/update', data), options);
}

export function useAdminTrigger(
  options?: UseMutationOptions<
    {
      code: number;
      message: string;
      result: AdminTriggerPayload;
    },
    ClientError,
    AdminTriggerDto
  >,
) {
  return useMutation<
    {
      code: number;
      message: string;
      result: AdminTriggerPayload;
    },
    ClientError,
    AdminTriggerDto
  >((data) => post('/todo-notice/admin/trigger', data), options);
}

export function useAdminRecords(
  queryKey: QueryKey,
  variable: RecordsListDto,
  config?: UseQueryOptions<
    {
      code: number;
      message: string;
      result?: RecordsListPayload;
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      message: string;
      result?: RecordsListPayload;
    },
    ClientError
  >(queryKey, () => post('/todo-notice/admin/records', variable), config);
}

export function useAdminRuns(
  queryKey: QueryKey,
  variable: RunsListDto,
  config?: UseQueryOptions<
    {
      code: number;
      message: string;
      result?: RunsListPayload;
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      message: string;
      result?: RunsListPayload;
    },
    ClientError
  >(queryKey, () => post('/todo-notice/admin/runs', variable), config);
}
