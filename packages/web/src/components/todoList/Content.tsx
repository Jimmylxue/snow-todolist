import { Button, message, notification } from 'antd';
import { TaskItem } from './Tasks';
import { TaskItem as Task } from '@/api/todolist/task/type';
import { TSearchTaskParams } from './SliderBar/SliderBar';
import { getFullTimeByIndex, getTimeTextByIndex } from './utils';
import { useDelTask, useUpdateTaskStatus } from '@/api/todolist/task';
import { BellOutlined, CheckCircleOutlined } from '@ant-design/icons';
import EmptyImage from '@/assets/img/todolist/empty.jpg';
import { config } from '@/config/react-query';
import { useUser } from '@/hooks/useAuth';
import { useSearchInfo } from '@/hooks/useSearch';
import { useMemo } from 'react';

type TProps = {
  onEditTask: (type: 'ADD' | 'EDIT', task?: Task) => void;
  taskData: Task[];
  searchParams?: TSearchTaskParams;
};

export function Content({ onEditTask, taskData, searchParams }: TProps) {
  const { mutateAsync } = useUpdateTaskStatus();
  const { mutateAsync: delTask } = useDelTask();
  const { queryClient } = config();
  const { checkUserLoginBeforeFn } = useUser();
  const { searchInfo, setSearchInfo } = useSearchInfo();

  const isSearch = searchInfo?.taskId; // 是否时搜索

  const taskList = useMemo(() => {
    if (searchInfo?.taskId) {
      return [searchInfo];
    }
    return taskData;
  }, [searchInfo, taskData]);

  return (
    <div className='content w-full flex justify-center'>
      <div
        className=' h-full'
        style={{
          width: 800,
        }}>
        <div className=' flex justify-between items-center py-1'>
          <div className='flex items-center'>
            <span className=' text-lg font-bold'>
              {getTimeTextByIndex(searchParams?.timeIndex)}
            </span>
          </div>
        </div>

        <div className=' flex justify-between items-center py-1'>
          <div className='flex items-center'>
            <span className=' text-lg font-bold'>
              {getFullTimeByIndex(
                searchParams?.timeIndex,
                searchParams?.startTime,
                searchParams?.endTime,
              )}
            </span>
          </div>
        </div>

        <div className=' flex justify-between items-center py-1 mb-2'>
          <div className='flex items-center'>
            <span className=' text-lg font-bold'>
              {searchParams?.status === 1 ? '已完成' : '未完成'}
            </span>
          </div>
        </div>
        {/* 任务项 */}
        {taskList?.map((task, index) => (
          <TaskItem
            isComplete={task.status}
            key={index}
            taskName={task.taskName}
            taskType={task.typeMessage?.typeName}
            task={task}
            desc={task.taskContent}
            onClick={() => {
              onEditTask('EDIT', task);
            }}
            onCompleteTask={async (status) => {
              const res = await mutateAsync({
                userId: 1001,
                status: !!status ? 1 : 0,
                taskId: task.taskId,
              });
              if (res.code === 200) {
                notification.info({
                  message: status ? `任务已完成` : '已恢复任务',
                  description: (
                    <>
                      <p className='text-base'>{task.taskName}</p>
                      <p className='text-xs'>{task.taskContent}</p>
                    </>
                  ),
                  placement: 'bottomLeft',
                  icon: status ? (
                    <CheckCircleOutlined
                      style={{
                        color: '#2ecc71',
                      }}
                    />
                  ) : (
                    <BellOutlined
                      style={{
                        color: '#f39c12',
                      }}
                    />
                  ),
                });
                queryClient.invalidateQueries('userTask');
              }
            }}
            onDeleteTask={async () => {
              const res = await delTask({
                taskId: task.taskId,
              });
              if (res.code === 200) {
                message.success('删除成功');
                queryClient.invalidateQueries('userTask');
              }
            }}
          />
        ))}
        {!taskData.length && (
          <div className=' w-full flex flex-col items-center justify-center mt-10'>
            <img src={EmptyImage} alt='' />
            <p>准备做点什么呢？😄</p>
          </div>
        )}

        {isSearch ? (
          <Button
            block
            type='primary'
            className='mt-3'
            onClick={() => {
              setSearchInfo(undefined as any);
              queryClient.invalidateQueries('userTask');
            }}>
            恢复搜索
          </Button>
        ) : (
          <Button
            block
            type='primary'
            className='mt-3'
            onClick={() => {
              if (checkUserLoginBeforeFn()) {
                onEditTask('ADD');
              }
            }}>
            添加任务
          </Button>
        )}
      </div>
    </div>
  );
}
