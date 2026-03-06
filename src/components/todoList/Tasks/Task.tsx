import { Checkbox, Popconfirm } from 'antd';
import { FC, HTMLAttributes, useMemo, useRef } from 'react';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  CarryOutOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import './index.less';
import dayjs from 'dayjs';
import { TaskItem as Task } from '@/api/todolist/task/type';
import classNames from 'classnames';
import { addAnimate } from '@/utils/animate';
import { getExpectNodeByTaskEnum, getTaskCompleteMsg } from './core';
import { showFireAnimate } from '../utils';

interface TProps extends HTMLAttributes<HTMLDivElement> {
  task: Task;
  onCompleteTask: (status: boolean) => void;
  onDeleteTask: () => void;
}

export const TaskItem: FC<TProps> = ({
  task,
  onCompleteTask,
  onClick,
  onDeleteTask,
}) => {
  const { taskName, taskContent, status } = task;
  const ref = useRef<HTMLDivElement>(null);

  const expectNode = useMemo(() => {
    const taskEnum = getTaskCompleteMsg(task);
    return getExpectNodeByTaskEnum(taskEnum!, task);
  }, [task]);

  const handleToggleStatus = () => {
    addAnimate(
      ref?.current!,
      ['animate__animated', 'animate__shakeX'],
      800,
    );
    if (status === 0) {
      showFireAnimate();
    }
    setTimeout(() => {
      onCompleteTask(status !== 1);
    }, 200);
  };

  return (
    <div
      ref={ref}
      className={classNames('snow-task-item', { completed: status === 1 })}>
      <div className='flex items-center'>
        <div
          className={classNames('snow-task-checkbox', {
            checked: status === 1,
          })}
          onClick={handleToggleStatus}>
          <CheckOutlined className='check-icon' />
        </div>
        <span
          onClick={onClick}
          className={classNames(
            'snow-task-title text-base ml-3 font-medium cursor-pointer',
            { 'line-through text-gray-400': status === 1 },
          )}>
          {taskName}
        </span>
      </div>
      <div
        className='pl-8 text-sm desc-text mt-2 text-gray-500'
        dangerouslySetInnerHTML={{
          __html: taskContent || '暂无描述',
        }}></div>
      <div className='pl-8 mt-3 flex items-center justify-between text-xs text-gray-400'>
         <div className='primary-color flex items-center'>{expectNode}</div>
         <div className='flex items-center'>
            <CarryOutOutlined className='mr-1' />
            {dayjs(+task.createTime).format('YYYY-MM-DD HH:mm')}
         </div>
      </div>
      <Popconfirm
        okText='确定'
        cancelText='取消'
        title='确定删除该任务吗？'
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        onConfirm={onDeleteTask}>
        <div className='snow-delete-btn'>
           <DeleteOutlined className='text-lg cursor-pointer text-red-400 hover:text-red-500' />
        </div>
      </Popconfirm>
    </div>
  );
};
