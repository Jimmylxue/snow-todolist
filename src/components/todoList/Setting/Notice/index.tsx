import { Switch, TimePicker, message, Spin, Empty } from 'antd';
import { useGetSetting, useUpdateSetting } from '@/api/todolist/todoNotice';
import { useUser } from '@/hooks/useAuth';
import moment from 'moment';
import { useEffect, useState } from 'react';

export function Notice() {
  const { user } = useUser();
  const { data, isLoading, refetch } = useGetSetting(
    ['getSetting', user?.id],
    {
      enabled: !!user?.id,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: updateSetting, isLoading: isUpdating } = useUpdateSetting({
    onSuccess: (res) => {
      if (res.code === 200) {
        message.success('设置更新成功');
        refetch();
      } else {
        message.error(res.message || '更新失败');
      }
    },
    onError: (err) => {
      message.error(err.message || '更新失败');
    },
  });

  const setting = data?.result;

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-40'>
        <Spin tip='加载设置中...' />
      </div>
    );
  }

  if (!setting) {
    return <Empty description='暂无设置信息' />;
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='text-base font-medium text-gray-800'>邮件通知</div>
          <div className='text-sm text-gray-500 mt-1'>
            开启后，每天早上将收到当天截止任务的邮件提醒
          </div>
        </div>
        <Switch
          checked={setting.emailEnabled}
          loading={isUpdating}
          onChange={(checked) => {
            updateSetting({
              emailEnabled: checked,
            });
          }}
        />
      </div>

      <div className='flex items-center justify-between'>
        <div>
          <div className='text-base font-medium text-gray-800'>站内信通知</div>
          <div className='text-sm text-gray-500 mt-1'>
            开启后，将在站内收到当天截止任务的通知
          </div>
        </div>
        <Switch
          checked={setting.letterEnabled}
          loading={isUpdating}
          onChange={(checked) => {
            updateSetting({
              letterEnabled: checked,
            });
          }}
        />
      </div>

      <div className='flex items-center justify-between'>
        <div>
          <div className='text-base font-medium text-gray-800'>通知时间</div>
          <div className='text-sm text-gray-500 mt-1'>
            设置每天接收通知的时间（默认 08:30）
          </div>
        </div>
        <TimePicker
          format='HH:mm'
          minuteStep={30}
          value={
            setting.preferredTime
              ? moment(setting.preferredTime, 'HH:mm')
              : moment('08:30', 'HH:mm')
          }
          allowClear={false}
          disabled={isUpdating}
          onChange={(time) => {
            if (time) {
              updateSetting({
                preferredTime: time.format('HH:mm'),
              });
            }
          }}
        />
      </div>
    </div>
  );
}
