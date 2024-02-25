import { SettingOutlined } from '@ant-design/icons';
import { Calendar } from 'antd';
import monthPng from '@/assets/img/sign/month.png';
import allPng from '@/assets/img/sign/all.png';
import ratePng from '@/assets/img/sign/rate.png';
import lianxuPng from '@/assets/img/sign/lianxu.png';
import smile1Png from '@/assets/img/sign/smile1.png';
import { MenuContainer } from '@/components/habit/MenuContainer';
import { useHabitDetail } from '@/api/sign/habit';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import classNames from 'classnames';
import { getDateInfo } from '../core';
import { useOperation } from '@/pages/habit/useOperation';
import { EStatus, THabit } from '@/api/sign/habit/type';
import { Empty } from '@/components/common/Empty';

type TProps = {
  habitId?: number;
  onEditHabit: (hab: THabit) => void;
};

export function HabitDetail({ habitId, onEditHabit }: TProps) {
  const todayMoment = moment();
  const [currentMoment, setCurrentMoment] = useState<Moment>(moment());

  const { data } = useHabitDetail(
    ['habitDetail', currentMoment, habitId],
    {
      habitId: habitId!,
      signYear: String(currentMoment.year()),
      signMonth: String(currentMoment.month() + 1).padStart(2, '0'),
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!habitId,
    },
  );

  const { updateStatus, delHabit } = useOperation();

  const habitDetail = data?.result;

  const habit = habitDetail?.records?.[0]?.habit;

  const dateFullCellRender = (value: Moment) => {
    const {
      renderIsNowDay,
      isOverToday,
      isNotNowMonth,
      isNotNowYear,
      itemCurrent,
      itemCurrentMonth,
    } = getDateInfo(todayMoment, value);

    const isCompleted =
      data?.result?.records
        .map((item) => +item.signDay)
        .includes(itemCurrent) && itemCurrentMonth === todayMoment.month();

    if (isOverToday || isNotNowYear || isNotNowMonth) {
      /**
       * 渲染默认样式
       */
      return (
        <div
          className=' mx-auto flex justify-center items-center'
          style={{
            width: 40,
            height: 40,
          }}>
          {itemCurrent}
        </div>
      );
    }

    if (isCompleted) {
      return (
        <div
          className={classNames(
            ' rounded-full mx-auto flex justify-center items-center',
            {
              primaryNavBarBgColor: isCompleted,
              'text-white': isCompleted,
            },
          )}
          style={{
            width: 40,
            height: 40,
          }}>
          {itemCurrent}
        </div>
      );
    } else {
      return (
        <div
          className={classNames(
            ' rounded-full mx-auto flex justify-center items-center',
            {
              'primary-color': renderIsNowDay,
            },
          )}
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#f6f6f6',
          }}>
          {itemCurrent}
        </div>
      );
    }
  };

  return (
    <div
      className=' w-2/5 py-4'
      style={{
        borderLeft: '1px solid #f3f3f3',
      }}>
      {!habit ? (
        <Empty desc='点击习惯标题查看详情' emptyType={2} />
      ) : (
        <>
          <div className=' flex justify-between items-center px-4'>
            <div className=' flex items-center'>
              <img
                src={smile1Png}
                style={{
                  width: 40,
                  height: 40,
                }}
                alt=''
              />
              <div className=' ml-2 text-lg'>{habit?.name}</div>
            </div>
            <div>
              <MenuContainer
                placement='bottomRight'
                onChange={async (type) => {
                  if (type === 'edit') {
                    onEditHabit(habit!);
                    return;
                  }
                  if (type === 'complete') {
                    await updateStatus({
                      habitId: habit?.habitId!,
                      status: EStatus.已归档,
                    });
                    return;
                  }
                  if (type === 'reset') {
                    await updateStatus({
                      habitId: habit?.habitId!,
                      status: EStatus.进行中,
                    });
                    return;
                  }
                  if (type === 'delete') {
                    await delHabit({
                      habitId: habit?.habitId!,
                    });
                  }
                }}
                habit={habit!}>
                <SettingOutlined />
              </MenuContainer>
            </div>
          </div>
          <div className=' mt-4 px-4'>
            <div className=' flex  gap-4 '>
              <div
                className=' w-1/2 py-4 px-4'
                style={{
                  backgroundColor: '#f8f8f8',
                }}>
                <div className=' flex '>
                  <img
                    src={monthPng}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    alt=''
                  />
                  <div className='text-desc ml-1'>月打卡</div>
                </div>
                <div className=' flex items-center'>
                  <div className=' text-2xl mr-1'>
                    {habitDetail?.monthCount}
                  </div>
                  <div className=' mt-1'>天</div>
                </div>
              </div>
              <div
                className=' w-1/2 py-4 px-4'
                style={{
                  backgroundColor: '#f8f8f8',
                }}>
                <div className=' flex '>
                  <img
                    src={allPng}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    alt=''
                  />
                  <div className='text-desc ml-1'>总打卡</div>
                </div>
                <div className=' flex items-center'>
                  <div className=' text-2xl mr-1'>{habitDetail?.allCount}</div>
                  <div className=' mt-1'>天</div>
                </div>
              </div>
            </div>
            <div className=' flex gap-4 mt-4'>
              <div
                className=' w-1/2 py-4 px-4'
                style={{
                  backgroundColor: '#f8f8f8',
                }}>
                <div className=' flex '>
                  <img
                    src={ratePng}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    alt=''
                  />
                  <div className='text-desc ml-1'>月完成率</div>
                </div>
                <div className=' flex items-center'>
                  <div className=' text-2xl mr-1'>{habitDetail?.monthRate}</div>
                  <div className=' mt-1'>%</div>
                </div>
              </div>
              <div
                className=' w-1/2 py-4 px-4'
                style={{
                  backgroundColor: '#f8f8f8',
                }}>
                <div className=' flex '>
                  <img
                    src={lianxuPng}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    alt=''
                  />
                  <div className='text-desc ml-1'>当前连续</div>
                </div>
                <div className=' flex items-center'>
                  <div className=' text-2xl mr-1'>
                    {habitDetail?.monthContinuityCount}
                  </div>
                  <div className=' mt-1'>天</div>
                </div>
              </div>
            </div>
          </div>
          <Calendar
            fullscreen={false}
            defaultValue={currentMoment}
            dateFullCellRender={dateFullCellRender}
            onPanelChange={(val) => {
              setCurrentMoment(val);
            }}
          />
        </>
      )}
    </div>
  );
}
