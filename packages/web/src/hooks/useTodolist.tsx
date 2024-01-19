import { useTaskType } from '@/api/todolist/taskType';
import { TaskType } from '@/api/todolist/taskType/type';
import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { useUser } from './useAuth';
import { observer } from 'mobx-react-lite';

type TodoListInfo = {
  /**
   * 纯正的用户任务类型数据
   */
  originTaskType?: TaskType[];
  /**
   * 处理过的用户类型数据
   */
  taskType?: TaskType[];
  isFetchingTaskType?: boolean;
};

export const TodoListContext = createContext<TodoListInfo>({});

type TProps = {
  children: ReactNode;
};

export const TodoListProvider: FC<TProps> = observer((props) => {
  const { user } = useUser();

  const { data, isFetching } = useTaskType(
    'taskType',
    {},
    {
      refetchOnWindowFocus: false,
      enabled: !!user?.id,
    },
  );

  const taskType = useMemo(() => {
    if (data) {
      return [
        { typeId: undefined, typeName: '全部' } as any,
        ...(data.result || []),
      ];
    }
    return [];
  }, [data]);

  return (
    <TodoListContext.Provider
      value={{
        originTaskType: data?.result || [],
        isFetchingTaskType: isFetching,
        taskType,
      }}>
      {props.children}
    </TodoListContext.Provider>
  );
});

export const useTodoList = () => {
  return useContext(TodoListContext);
};
