import { useUpdateRecord } from '@/api/todolist/base/updateRecord';
import { getChangeLog } from './core';

export function useUpdateMessage() {
  const { data } = useUpdateRecord(
    ['updateRecord'],
    {
      user: 'Jimmylxue',
      repos: 'snow-todolist',
      branch: 'web-master',
      startTime: '2022-01-01',
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const changeLog = getChangeLog(data?.result || []);

  return { changeLog };
}
