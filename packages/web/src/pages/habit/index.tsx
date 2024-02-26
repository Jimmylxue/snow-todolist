import { HabitItem } from '@/components/habit/HabitItem';
import { NavBar } from '@/components/habit/NavBar';
import { useState } from 'react';
import { EStatus, THabit } from '@/api/sign/habit/type';
import { useUpdateSign, useUserHabit } from '@/api/sign/habit';
import { HabitDetail } from '@/components/habit/HabitDetail';
import { config } from '@/config/react-query';
import { useModal } from '@/hooks/useModal';
import { HabitModal } from '@/components/habit/HabitModal';
import { useOperation } from './useOperation';
import { Empty } from '@/components/common/Empty';
import { Button } from 'antd';
import { showFireAnimate } from '@/components/todoList/utils';

export function HabitPage() {
  const [signStatus, setSignStatus] = useState<EStatus>(EStatus.进行中);
  const { queryClient } = config();
  const [selectHabitId, setSelectHabitId] = useState<number>();
  const habitModal = useModal<{
    type: 'ADD' | 'EDIT';
    habitInfo?: THabit;
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

  const { updateStatus, delHabit } = useOperation();

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
        {!!habit?.result?.length ? (
          habit?.result?.map((hab) => (
            <HabitItem
              habit={hab}
              key={hab.habitId}
              checked={hab.habitId === selectHabitId}
              onClick={(e) => {
                console.log('点击了');
                setSelectHabitId(hab.habitId);
              }}
              updateSign={async (params) => {
                await updateSign(params);
              }}
              onEdit={async (type) => {
                if (type === 'edit') {
                  habitModal.openModal({
                    type: 'EDIT',
                    habitInfo: hab,
                  });
                  return;
                }
                if (type === 'complete') {
                  await updateStatus({
                    habitId: hab.habitId,
                    status: EStatus.已归档,
                  });
                  return;
                }
                if (type === 'reset') {
                  await updateStatus({
                    habitId: hab.habitId,
                    status: EStatus.进行中,
                  });
                  return;
                }
                if (type === 'delete') {
                  await delHabit({
                    habitId: hab.habitId,
                  });
                }
              }}
            />
          ))
        ) : (
          <Empty
            desc={
              <div className=' flex flex-col justify-center items-center'>
                <p>一起养成打卡习惯吧</p>
                <p className=' text-xs text-gray-400 mt-2'>
                  ✨ 坚持的力量，能令我们闪闪发光 ✨
                </p>
                <Button
                  type='primary'
                  className=' mt-2'
                  onClick={() => {
                    habitModal.openModal({ type: 'ADD' });
                  }}>
                  添加习惯
                </Button>
              </div>
            }
          />
        )}
      </div>
      <HabitDetail
        habitId={selectHabitId}
        onEditHabit={(hab) => {
          habitModal.openModal({
            type: 'EDIT',
            habitInfo: hab,
          });
        }}
        updateSign={async (params, isWantComplete) => {
          if (isWantComplete) {
            showFireAnimate();
          }
          await updateSign(params);
        }}
      />
      <HabitModal {...habitModal} />
    </div>
  );
}
