import { Checkbox, Divider, Popconfirm } from 'antd';
import { FC, HTMLAttributes, useMemo, useRef, useState } from 'react';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  CarryOutOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import './index.less';
import dayjs from 'dayjs';
import { TaskItem as Task } from '@/api/todolist/task/type';
import classNames from 'classnames';
import { addAnimate } from '@/utils/animate';
import { getDayCountByTimeStamp } from '../SliderBar/core';
import { getExpectNodeByTaskEnum, getTaskCompleteMsg } from './core';
import { showFireAnimate } from '../utils';
// const confetti = require('canvas-confetti');
// confetti.Promise = MyPromise;

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
  const { taskName, taskContent, status, expectTime } = task;
  const ref = useRef<HTMLDivElement>(null);

  const expectNode = useMemo(() => {
    const taskEnum = getTaskCompleteMsg(task);
    return getExpectNodeByTaskEnum(taskEnum!, task);
  }, [task]);

  return (
    <div
      ref={ref}
      className={classNames('snow-task-item relative px-2 py-2 rounded-md', {
        // 'animate__animated animate__shakeX': isClick,
      })}>
      <div>
        <Checkbox
          checked={status === 1}
          onChange={(e) => {
            addAnimate(
              ref?.current!,
              ['animate__animated', 'animate__shakeX'],
              800,
            );
            if (status === 0) {
              showFireAnimate();
            }
            setTimeout(() => {
              onCompleteTask(e.target.checked);
            }, 200);
            // todo 完成任务
          }}></Checkbox>
        <span onClick={onClick} className=' text-sm ml-2 cursor-pointer'>
          {taskName}
        </span>
      </div>
      <div className='px-6 text-xs desc-text mt-1'>{taskContent}</div>
      <div className='text-xs flex justify-between desc-text items-center mt-2 mb-1'>
        <div className='pl-6 primary-color'>{expectNode} </div>
        <div>
          <CarryOutOutlined className='mr-1' />
          {dayjs(+task.createTime).format('YYYY-MM-DD - h:mm:ss - a')}
        </div>
      </div>
      <Popconfirm
        okText='确定'
        cancelText='取消'
        title='确定删除该任务吗？'
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        onConfirm={onDeleteTask}>
        <DeleteOutlined className='snow-delete-btn absolute right-2 top-1/2 -translate-y-1/2 text-base cursor-pointer' />
      </Popconfirm>
    </div>
  );
};
