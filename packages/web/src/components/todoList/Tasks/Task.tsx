import { Checkbox, Divider, Popconfirm } from 'antd';
import { FC, HTMLAttributes } from 'react';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  DribbbleOutlined,
} from '@ant-design/icons';
import './index.less';
import dayjs from 'dayjs';
import { TaskItem as Task } from '@/api/todolist/task/type';
import { renderIcon } from '../SliderBar/SliderBar';

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
        <span onClick={onClick} className=' text-sm ml-2 cursor-pointer'>
          {taskName}
        </span>
      </div>
      <div className='px-6 text-xs desc-text mt-1'>{desc}</div>
      {/* <div className=' flex justify-end mt-3'>
        <div className='text-xs flex items-center'>
          {renderIcon(task.typeMessage.icon, task.typeMessage.themeColor)}
          <div className='ml-1'>{taskType}</div>
        </div>
      </div> */}
      <div className='text-xs flex justify-end desc-text'>
        create : {dayjs(+task.createTime).format('YYYY-MM-DD - h:mm:ss - a')}
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
