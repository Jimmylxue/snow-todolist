import { Content, TSearchTaskParams, TasksModal } from '@/components/todoList';
import { useEffect, useMemo, useRef, useState } from 'react';
import './index.less';
import { SliderBar } from '@/components/todoList/SliderBar/SliderBar';
import { useUserTask } from '@/api/todolist/task';
import { Pagination, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { TaskItem } from '@/api/todolist/task/type';
import { ActionBar } from '@/components/todoList/ActionBar';
import { useUser } from '@/hooks/useAuth';

type TProps = {
  menuShow: boolean;
  taskModalShow: boolean;
  onCloseTaskModal: () => void;
};

export const TodoList = observer(
  ({ menuShow, taskModalShow, onCloseTaskModal }: TProps) => {
    const [searchParams, setSearchParams] = useState<TSearchTaskParams>();
    const [pageParams, setPageParams] = useState<{
      page: number;
      pageSize: number;
    }>({
      page: 1,
      pageSize: 10,
    });

    const taskModalType = useRef<'ADD' | 'EDIT'>('ADD');
    const selectTask = useRef<TaskItem>();
    const currentChooseTaskType = useRef<number>();
    const { user } = useUser();

    const { data, isFetching } = useUserTask(
      ['userTask', searchParams, pageParams],
      {
        status: searchParams?.status,
        startTime: searchParams?.startTime,
        endTime: searchParams?.endTime,
        typeId: searchParams?.taskType,
        page: pageParams.page,
        pageSize: pageParams.pageSize,
      },
      {
        refetchOnWindowFocus: false,
        enabled:
          !!searchParams?.startTime && !!searchParams.taskType && !!user?.id,
      },
    );

    useEffect(() => {
      if (searchParams?.taskType) {
        currentChooseTaskType.current = searchParams?.taskType;
      }
    }, [searchParams]);

    const hasOneMorePage = useMemo(() => {
      if (data?.result?.total) {
        return data.result.total / 10 > 1;
      }
      return false;
    }, [data?.result]);

    return (
      <>
        <div className=' w-full flex flex-grow'>
          <SliderBar
            menuShow={menuShow}
            onSearchChange={(searchParams) => {
              setSearchParams(searchParams);
            }}
          />
          <div className='flex-grow h-full snow-content'>
            <Spin tip='Loading...' spinning={isFetching} className='h-full'>
              <Content
                searchParams={searchParams}
                taskData={data?.result?.result || []}
                onEditTask={(type, task) => {
                  taskModalType.current = type;
                  // @ts-ignore
                  selectTask.current = { ...task };
                  currentChooseTaskType.current = searchParams?.taskType;
                  onCloseTaskModal();
                }}
              />
              {hasOneMorePage && (
                <div
                  className=' flex w-full justify-end '
                  style={{
                    width: 800,
                    margin: '0 auto',
                    marginTop: 10,
                  }}>
                  <Pagination
                    size='small'
                    current={data?.result?.page}
                    defaultCurrent={data?.result?.page}
                    total={data?.result?.total}
                    onChange={(pageData) => {
                      setPageParams((params) => ({
                        ...params,
                        page: pageData,
                      }));
                    }}
                  />
                </div>
              )}
            </Spin>
          </div>
        </div>
        <TasksModal
          type={taskModalType.current}
          selectTask={selectTask.current}
          selectTaskType={currentChooseTaskType.current}
          show={taskModalShow}
          onCancel={() => {
            onCloseTaskModal();
          }}
          onOk={() => {
            onCloseTaskModal();
          }}
        />
        <ActionBar />
      </>
    );
  },
);
