import { useDelHabit, useUpdateStatusHabit } from '@/api/sign/habit';
import { config } from '@/config/react-query';
import { message } from 'antd';

export function useOperation() {
  const { queryClient } = config();
  const { mutateAsync: updateStatus } = useUpdateStatusHabit({
    onSuccess() {
      queryClient.invalidateQueries('userHabit');
      message.success('操作成功');
    },
  });
  const { mutateAsync: delHabit } = useDelHabit({
    onSuccess() {
      queryClient.invalidateQueries('userHabit');
      message.success('操作成功');
    },
  });

  return {
    updateStatus,
    delHabit,
  };
}
