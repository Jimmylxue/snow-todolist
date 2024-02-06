import { HabitItem } from '@/components/habit/HabitItem';
import { NavBar } from '@/components/habit/NavBar';
import { useState } from 'react';
import { EStatus } from '@/api/sign/habit/type';
import { useUserHabit } from '@/api/sign/habit';
import { HabitDetail } from '@/components/habit/HabitDetail';

export function HabitPage() {
  const [signStatus, setSignStatus] = useState<EStatus>(EStatus.进行中);

  const [selectHabitId, setSelectHabitId] = useState<number>();

  const { data: habit } = useUserHabit(
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

  return (
    <div className=' w-full flex h-full'>
      <div className=' w-3/5 py-4'>
        <NavBar
          status={signStatus}
          onChange={(val) => {
            setSignStatus(val);
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
          />
        ))}
      </div>
      <HabitDetail habitId={selectHabitId} />
    </div>
  );
}
