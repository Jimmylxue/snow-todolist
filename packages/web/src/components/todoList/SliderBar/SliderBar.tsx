import classNames from 'classnames';
import { MenuItem } from './MenuItem';
import { useEffect, useState, useRef } from 'react';
import { SButton } from '../Button';
import { PlusOutlined, SlackOutlined } from '@ant-design/icons';
import { TaskTypeModal } from '../Tasks/TaskTypeModal';
import { useDelTaskType } from '@/api/todolist/taskType';
import { message, DatePicker, Empty, Spin } from 'antd';
import {
  getCurrentMonthsTime,
  getStatusByIndex,
  getTaskTypeByIndex,
  getTimeByIndex,
  getTimeStringByDate,
} from './core';
import { useTodoList } from '@/hooks/useTodolist';
import { TaskType } from '@/api/todolist/taskType/type';
import { config } from '@/config/react-query';
import { useUser } from '@/hooks/useAuth';
import moment from 'moment';
import { taskStatusListConst, timeListConst } from './const';
import { useSearchInfo } from '@/hooks/useSearch';
import Icon from '@ant-design/icons';
import * as icons from '@ant-design/icons';
import './style.less';
import { STime, TSearchTaskParams } from './type';

const { RangePicker } = DatePicker;

type TProps = {
  menuShow: boolean;
  onSearchChange: (params: TSearchTaskParams) => void;
};

export function SliderBar({ menuShow, onSearchChange }: TProps) {
  const { taskType: taskTypeList, isFetchingTaskType } = useTodoList();
  const { checkUserLoginBeforeFn } = useUser();

  const [timeIndex, setTimeIndex] = useState<STime>(timeListConst[0].type);
  const [taskStatusIndex, setTaskStatusIndex] = useState<number>(0);
  const [taskTypeIndex, setTaskTypeIndex] = useState<number>(0);

  const [taskTypeModalShow, setTaskTypeModalShow] = useState<boolean>(false);
  const [taskTypeModalType, setTaskTypeModalType] = useState<'ADD' | 'EDIT'>(
    'ADD',
  );

  const timeStr = useRef<number[]>([0, 0]);
  const selectTaskType = useRef<TaskType>();
  const dateRangeValue = useRef<[moment.Moment, moment.Moment]>([
    moment(moment(new Date()).subtract(1, 'months').format('YYYY/MM/DD')),
    moment(new Date(), 'YYYY/MM/DD'),
  ]);

  const { mutateAsync: delTaskType } = useDelTaskType();
  const { queryClient } = config();

  const { searchInfo, setSearchInfo } = useSearchInfo();

  const paramsChangeFn = () => {
    if (searchInfo?.taskId) {
      console.log('搜索数据 无需请求');
      return;
    }

    const [startTime, endTime] = getTimeByIndex(timeIndex);
    const { status } = getStatusByIndex(taskStatusIndex);
    const { taskType } = getTaskTypeByIndex(taskTypeIndex, taskTypeList!);

    const params = {
      taskType,
      status,
      startTime,
      endTime,
      timeIndex,
    };

    if (timeIndex === STime.自定义 && !timeStr.current?.[0]) {
      // 未选时间 默认赋值一个月的时间
      timeStr.current = getCurrentMonthsTime();
    }

    if (timeIndex === STime.自定义 && timeStr.current[0]) {
      // 自定义
      params.startTime = timeStr.current[0];
      params.endTime = timeStr.current[1];
    }
    onSearchChange(params);
  };

  // index 变化触发请求
  useEffect(() => {
    if (taskTypeList?.length) {
      paramsChangeFn();
    }
  }, [timeIndex, taskStatusIndex, taskTypeList]);

  useEffect(() => {
    if (taskTypeIndex === 0) {
      if (taskTypeList?.length) {
        paramsChangeFn();
      }
    } else {
      paramsChangeFn();
    }
  }, [taskTypeIndex, taskTypeList]);

  // 搜索任务时 默认赋值
  useEffect(() => {
    if (!taskTypeList || !searchInfo?.taskId) {
      return;
    }
    const searchItem = searchInfo;
    setTaskStatusIndex(searchItem.status);
    const taskTypeIndex = taskTypeList?.findIndex(
      (taskType) => taskType.typeId === searchItem.typeId,
    );
    setTaskTypeIndex(taskTypeIndex!);
    dateRangeValue.current = [
      moment(+searchItem.createTime),
      moment(+searchItem.createTime),
    ];
    const res = dateRangeValue.current?.map((info) =>
      info?.format('YYYY/MM/DD'),
    );
    const tempStr = [
      getTimeStringByDate(res?.[0]!, 'start'),
      getTimeStringByDate(res?.[1]!, 'end'),
    ];
    timeStr.current = tempStr;
    setTimeIndex(STime.自定义); // 搜索时定位至自定义
  }, [taskTypeList, searchInfo]);

  return (
    <div
      className={classNames(
        'sliderBar-container whitespace-nowrap overflow-hidden flex-shrink-0',
        {
          sliderBarShow: menuShow,
          sliderBarClose: !menuShow,
        },
      )}>
      <div className='w-full px-3 py-3'>
        <div className=' flex justify-between items-center'>
          <div className=' font-bold text-small mb-1 text-desc'>日期</div>
        </div>
        {timeListConst.map((menu, index) => (
          <MenuItem
            key={index}
            checked={menu.type === timeIndex}
            icon={menu.icon}
            text={menu.text}
            message={<></>}
            onClick={() => {
              setSearchInfo(undefined as any);
              setTimeIndex(menu.type);
            }}
          />
        ))}
        {timeIndex === STime.自定义 && (
          <div className='mt-2'>
            <RangePicker
              format={'YYYY/MM/DD'}
              defaultValue={dateRangeValue.current}
              value={dateRangeValue.current}
              onChange={(date) => {
                const res = date?.map((info) => info?.format('YYYY/MM/DD'));
                const tempStr = [
                  getTimeStringByDate(res?.[0]!, 'start'),
                  getTimeStringByDate(res?.[1]!, 'end'),
                ];
                timeStr.current = tempStr;
                setSearchInfo(undefined as any);
                dateRangeValue.current = [
                  moment(+tempStr[0]),
                  moment(+tempStr[1]),
                ];
                paramsChangeFn();
              }}
              onOk={() => {}}
            />
          </div>
        )}
      </div>
      <div className='w-full px-3 py-3'>
        <div className=' flex justify-between items-center'>
          <div className=' font-bold text-small mb-1 text-desc'>状态</div>
        </div>

        {taskStatusListConst.map((status, index) => (
          <MenuItem
            key={index}
            checked={index === taskStatusIndex}
            icon={status.icon}
            text={status.statusName}
            message={<></>}
            onClick={() => {
              setSearchInfo(undefined as any);
              setTaskStatusIndex(index);
            }}
          />
        ))}
      </div>

      <Spin tip='Loading...' spinning={isFetchingTaskType} className='h-full'>
        <div className='px-3 py-3'>
          <div className=' flex justify-between items-center'>
            <div className=' font-bold text-small mb-1 text-desc'>任务类型</div>
            <SButton
              className='ml-2 cursor-pointer'
              icon={<PlusOutlined className=' flex text-sm flex-shrink-0' />}
              onClick={() => {
                if (checkUserLoginBeforeFn()) {
                  setTaskTypeModalType('ADD');
                  selectTaskType.current = void 0;
                  setTaskTypeModalShow(true);
                }
              }}
            />
          </div>
          <div>
            {taskTypeList?.map((taskType, index) => (
              <MenuItem
                key={index}
                showEdit
                showDel
                checked={index === taskTypeIndex}
                icon={renderIcon(taskType.icon, taskType.themeColor)}
                text={taskType.typeName}
                message={<></>}
                onClick={() => {
                  setSearchInfo(undefined as any);
                  setTaskTypeModalType('ADD');
                  setTaskTypeIndex(index);
                }}
                onEdit={() => {
                  selectTaskType.current = { ...taskType };
                  setTaskTypeModalType('EDIT');
                  setTaskTypeModalShow(true);
                }}
                onDel={async () => {
                  const res = await delTaskType({ typeId: taskType?.typeId! });
                  if (res.code === 200) {
                    message.success('操作成功');
                    queryClient.invalidateQueries('taskType');
                  }
                }}
              />
            ))}
            {!taskTypeList?.length && (
              <div className='mt-8'>
                <Empty description='创建一个类型吧' />
              </div>
            )}
          </div>
        </div>
      </Spin>

      <TaskTypeModal
        type={taskTypeModalType}
        typeInfo={selectTaskType.current}
        show={taskTypeModalShow}
        onCancel={() => {
          setTaskTypeModalShow(false);
        }}
      />
    </div>
  );
}

export function renderIcon(iconName?: string, themeColor?: string) {
  // @ts-ignore
  const isAntdIcon = iconName && icons?.[iconName];

  if (isAntdIcon) {
    return (
      <Icon
        className='text-lg'
        component={(icons as any)?.[iconName]}
        style={{
          color: themeColor,
        }}
      />
    );
  }

  return (
    <SlackOutlined
      className='text-lg'
      style={{
        color: themeColor,
      }}
    />
  );

  return;
}
