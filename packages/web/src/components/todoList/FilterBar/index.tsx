import { useEffect, useMemo, useRef, useState } from 'react';
import { DatePicker, Popover, Tag, Segmented } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import './style.less';
import { useTodoList } from '@/hooks/useTodolist';
import { useSearchInfo } from '@/hooks/useSearch';
import { STime, TSearchTaskParams } from '../SliderBar';
import {
  getStatusByIndex,
  getTaskTypeByIndex,
  getTimeByIndex,
  getTimeStringByDate,
} from '@/pages/todoList/menu/core';
import {
  taskStatusListConst,
  timeListConst,
} from '@/pages/todoList/menu/const';
import { PlusOutlined, SlackOutlined } from '@ant-design/icons';
import * as icons from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import { useUser } from '@/hooks/useAuth';
import { TaskTypeModal } from '../Tasks/TaskTypeModal';
import { TaskType } from '@/api/todolist/taskType/type';

const { RangePicker } = DatePicker;

type TProps = {
  onChange: (params: TSearchTaskParams) => void;
};

export function FilterBar({ onChange }: TProps) {
  const { taskType: taskTypeList } = useTodoList();
  const { setSearchInfo, searchInfo } = useSearchInfo();
  const { checkUserLoginBeforeFn } = useUser();

  const [timeIndex, setTimeIndex] = useState<STime>(timeListConst[0].type);
  const [taskStatusIndex, setTaskStatusIndex] = useState<number>(-1);
  const [taskTypeIndex, setTaskTypeIndex] = useState<number>(0);
  const [filterType, setFilterType] = useState<1 | 2>(1);

  const [taskTypeModalShow, setTaskTypeModalShow] = useState<boolean>(false);
  const [taskTypeModalType, setTaskTypeModalType] = useState<'ADD' | 'EDIT'>(
    'ADD',
  );
  const selectTaskType = useRef<TaskType>();

  const timeStr = useRef<number[]>([0, 0]);
  const dateRangeValue = useRef<[moment.Moment, moment.Moment]>([
    moment(moment(new Date()).subtract(1, 'months').format('YYYY/MM/DD')),
    moment(new Date(), 'YYYY/MM/DD'),
  ]);

  const paramsChangeFn = () => {
    const [startTime, endTime] = getTimeByIndex(timeIndex);
    const { status } = getStatusByIndex(taskStatusIndex);
    const { taskType } = getTaskTypeByIndex(taskTypeIndex, taskTypeList!);

    const params = {
      taskType,
      status,
      startTime,
      endTime,
      timeIndex,
      filterType,
    };

    if (timeIndex === STime.自定义 && !timeStr.current?.[0]) {
      timeStr.current = [
        moment().subtract(1, 'months').startOf('D').valueOf(),
        moment().endOf('D').valueOf(),
      ];
    }

    if (timeIndex === STime.自定义 && timeStr.current[0]) {
      params.startTime = timeStr.current[0];
      params.endTime = timeStr.current[1];
    }
    onChange(params);
  };

  useEffect(() => {
    if (taskTypeList?.length) {
      paramsChangeFn();
    }
  }, [timeIndex, taskStatusIndex, taskTypeList, filterType]);

  useEffect(() => {
    paramsChangeFn();
  }, [taskTypeIndex, taskTypeList]);

  useEffect(() => {
    if (!taskTypeList || !searchInfo?.taskId) {
      return;
    }
    setTaskStatusIndex(searchInfo.status);
    const idx = taskTypeList?.findIndex((t) => t.typeId === searchInfo.typeId);
    setTaskTypeIndex(idx!);
    dateRangeValue.current = [
      moment(+searchInfo.createTime),
      moment(+searchInfo.createTime),
    ];
    const res = dateRangeValue.current?.map((i) => i?.format('YYYY/MM/DD'));
    const tempStr = [
      getTimeStringByDate(res?.[0]!, 'start'),
      getTimeStringByDate(res?.[1]!, 'end'),
    ];
    timeStr.current = tempStr;
    setTimeIndex(STime.自定义);
  }, [taskTypeList, searchInfo]);

  const typeTags = useMemo(() => taskTypeList || [], [taskTypeList]);

  return (
    <div className='snow-filterbar w-full flex justify-center'>
      <div className='snow-filterbar-inner animate__animated animate__fadeInDown'>
        {/* Top Section: Time Tabs */}
        <div className='snow-time-tabs'>
          <div className='snow-filter-time-type'>
            <div className='snow-segmented-wrap'>
              <Segmented
                value={filterType}
                onChange={(value) => {
                  setSearchInfo(undefined as any);
                  setFilterType(value as 1 | 2);
                }}
                options={[
                  { label: '创建时间', value: 1 },
                  { label: '完成时间', value: 2 },
                ]}
              />
            </div>
          </div>
          <div className='snow-divider-vertical'></div>
          {timeListConst.map((menu, index) => {
            const isActive = menu.type === timeIndex;
            const isCustom = menu.type === STime.自定义;

            if (isCustom) {
              return (
                <Popover
                  key={index}
                  trigger='click'
                  placement='bottom'
                  overlayClassName='snow-filter-popover'
                  content={
                    <RangePicker
                      format={'YYYY/MM/DD'}
                      defaultValue={dateRangeValue.current}
                      value={dateRangeValue.current}
                      size='small'
                      bordered={false}
                      allowClear={false}
                      onChange={(date) => {
                        const res = date?.map((info) =>
                          info?.format('YYYY/MM/DD'),
                        );
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
                    />
                  }>
                  <div
                    className={classNames('snow-tab-item', {
                      active: isActive,
                    })}
                    onClick={() => {
                      setSearchInfo(undefined as any);
                      setTimeIndex(menu.type);
                    }}>
                    {menu.icon}
                    {menu.text}
                  </div>
                </Popover>
              );
            }

            return (
              <div
                key={index}
                className={classNames('snow-tab-item', {
                  active: isActive,
                })}
                onClick={() => {
                  setSearchInfo(undefined as any);
                  setTimeIndex(menu.type);
                }}>
                {menu.icon}
                {menu.text}
              </div>
            );
          })}
        </div>

        <div className='snow-divider'></div>

        {/* Bottom Section: Filters */}
        <div className='snow-filter-row'>
          <div className='snow-filter-group'>
            <span className='label'>状态:</span>
            <div className='items'>
              <Segmented
                value={taskStatusIndex}
                onChange={(value) => {
                  setSearchInfo(undefined as any);
                  setTaskStatusIndex(Number(value));
                }}
                options={[
                  { label: '全部', value: -1 },
                  ...taskStatusListConst.map((status, index) => ({
                    label: status.statusName,
                    value: index,
                  })),
                ]}
              />
            </div>
          </div>

          <div className='snow-filter-group'>
            <span className='label'>类型:</span>
            <div className='items snow-filter-types'>
              {typeTags?.map((taskType, index) => (
                <Tag
                  key={index}
                  className={classNames('snow-pill', {
                    active: index === taskTypeIndex,
                  })}
                  onClick={() => {
                    setSearchInfo(undefined as any);
                    setTaskTypeIndex(index);
                  }}>
                  {taskType.typeName}
                </Tag>
              ))}
              <Tag
                className='snow-pill snow-add-type'
                onClick={() => {
                  if (checkUserLoginBeforeFn()) {
                    setTaskTypeModalType('ADD');
                    selectTaskType.current = undefined;
                    setTaskTypeModalShow(true);
                  }
                }}>
                <PlusOutlined />
              </Tag>
            </div>
          </div>
        </div>
      </div>
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
}
