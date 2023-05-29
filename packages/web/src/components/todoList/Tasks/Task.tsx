import { Checkbox, Popconfirm } from 'antd';
import { FC, HTMLAttributes } from 'react';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  DribbbleOutlined,
} from '@ant-design/icons';
import './index.less';
import dayjs from 'dayjs';
import { TaskItem as Task } from '@/api/todolist/task/type';

interface TProps extends HTMLAttributes<HTMLDivElement> {
  taskName: string;
  desc: string;
  taskType: string;
  task: Task;
  isComplete: 1 | 0;
  onCompleteTask: (status: boolean) => void;
  onDeleteTask: () => void;
}

export const TaskItem: FC<TProps> = ({
  taskName,
  desc,
  taskType,
  isComplete,
  task,
  onCompleteTask,
  onClick,
  onDeleteTask,
}) => {
  return (
    <div className='snow-task-item relative px-2 py-2 rounded-md'>
      <div>
        <Checkbox
          checked={isComplete === 1}
          onChange={(e) => {
            onCompleteTask(e.target.checked);
            // todo 完成任务
          }}></Checkbox>
        <span onClick={onClick} className=' text-base ml-2 cursor-pointer'>
          {taskName}
        </span>
      </div>
      <div className='px-6 text-xs'>{desc}</div>
      <div className=' flex justify-end mt-3'>
        <div
          className='text-xs'
          style={{
            color: '#f39c12',
          }}>
          <DribbbleOutlined className='mr-1' />
          {taskType}
        </div>
      </div>
      <div className='text-xs flex justify-end text-gray-500'>
        {dayjs(+task.createTime).format('YYYY-MM-DD - h:mm:ss - a')}
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
