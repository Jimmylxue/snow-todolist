import { Rate } from 'antd';
import classNames from 'classnames';
import { MenuContainer } from '../MenuContainer';
import { EStatus, TUpdateSign, TUserHabit } from '@/api/sign/habit/type';
import { HTMLAttributes } from 'react';
import { SmileIcon } from '../SmileLogo';

interface TProps extends HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  habit: TUserHabit;
  updateSign: TUpdateSign;
  onEdit: (type: 'edit' | 'complete' | 'delete' | 'reset') => void;
}

export function HabitItem({
  checked,
  habit,
  updateSign,
  onEdit,
  ...args
}: TProps) {
  const hasSignWeekCount = habit.nearWeekInfo.filter(
    (item) => !!item.isSign,
  ).length;

  return (
    <MenuContainer trigger={['contextMenu']} onChange={onEdit} habit={habit}>
      <div
        {...args}
        className={classNames(
          ' flex items-center justify-between cursor-pointer primaryHoverSignItemBackgroundColor px-3 py-2',
          {
            primarySignItemBackgroundColor: checked,
          },
        )}>
        <div className=' flex items-center'>
          <SmileIcon status={habit.status} />
          <div className=' ml-2'>{habit.name}</div>
        </div>
        <div className=' flex items-center'>
          {habit.status === EStatus.进行中 && (
            <div>
              {habit.nearWeekInfo.map((item, index) => (
                <Rate
                  key={index}
                  count={1}
                  value={item.isSign ? 1 : 0}
                  tooltips={[`${item.date} ${item.dayOfWeek}`]}
                  onChange={(value) => {
                    updateSign(
                      {
                        signDate: item.date,
                        habitId: habit.habitId,
                      },
                      !!value,
                    );
                  }}
                />
              ))}
            </div>
          )}
          <div className=' ml-4'>
            <div className=' flex items-center'>
              <div className=' text-lg mr-1'>{hasSignWeekCount}</div>天
            </div>
            <div className=' text-gray-400 -mt-1'>已坚持</div>
          </div>
        </div>
      </div>
    </MenuContainer>
  );
}
