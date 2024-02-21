import { HabitItem } from '@/components/habit/HabitItem';
import { NavBar } from '@/components/habit/NavBar';
import { useState } from 'react';
import { EStatus, TUserHabit } from '@/api/sign/habit/type';
import {
  useAddHabit,
  useEditHabit,
  useUpdateSign,
  useUserHabit,
} from '@/api/sign/habit';
import { HabitDetail } from '@/components/habit/HabitDetail';
import { config } from '@/config/react-query';
import { useModal } from '@/hooks/useModal';
import { HabitModal } from '@/components/habit/HabitModal';

export function HabitPage() {
  const [signStatus, setSignStatus] = useState<EStatus>(EStatus.进行中);
  const { queryClient } = config();
  const [selectHabitId, setSelectHabitId] = useState<number>();
  const habitModal = useModal<{
    type: 'ADD' | 'EDIT';
    habitInfo?: TUserHabit;
  }>();
  const { data: habit, refetch } = useUserHabit(
    ['userHabit', signStatus],
    { status: signStatus },
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        if (data.result?.length) {
          setSelectHabitId(data.result[0].habitId);
        }
      },
    },
  );

  const { mutateAsync: updateSign } = useUpdateSign({
    onSuccess: () => {
      refetch();
      setTimeout(() => {
        queryClient.invalidateQueries('habitDetail');
      }, 500);
    },
  });

  return (
    <div className=' w-full flex h-full'>
      <div className=' w-3/5 py-4'>
        <NavBar
          status={signStatus}
          onChange={(val) => {
            setSignStatus(val);
          }}
          onAddHabit={() => {
            habitModal.openModal({
              type: 'ADD',
            });
          }}
        />
        {habit?.result?.map((hab) => (
          <HabitItem
            habit={hab}
            key={hab.habitId}
            checked={hab.habitId === selectHabitId}
            onClick={() => {
              setSelectHabitId(hab.habitId);
            }}
            updateSign={async (params) => {
              await updateSign(params);
            }}
            onEdit={(type) => {
              if (type === 'edit') {
                habitModal.openModal({
                  type: 'EDIT',
                  habitInfo: hab,
                });
              }
            }}
          />
        ))}
      </div>
      <HabitDetail habitId={selectHabitId} />
      <HabitModal {...habitModal} />
    </div>
  );
}
