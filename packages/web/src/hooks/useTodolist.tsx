import { useTaskType } from '@/api/todolist/taskType';
import { TaskType } from '@/api/todolist/taskType/type';
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useUser } from './useAuth';
import { message } from 'antd';

type TodoListInfo = {
  taskType?: TaskType[];
  isFetchingTaskType?: boolean;
};

export const TodoListContext = createContext<TodoListInfo>({});

type TProps = {
  children: ReactNode;
};

export const TodoListProvider: FC<TProps> = (props) => {
  const [taskListInfo, setTaskListInfo] = useState<TodoListInfo>({
    taskType: undefined,
    isFetchingTaskType: false,
  });
  const { user } = useUser();

  const { data, isFetching } = useTaskType(
    'taskType',
    {},
    {
      refetchOnWindowFocus: false,
      enabled: !!user?.id,
    },
  );

  useEffect(() => {
    if (data) {
      setTaskListInfo((info) => ({ ...info, taskType: data.result }));
    } else {
      setTaskListInfo((info) => ({ ...info, taskType: [] }));
    }
  }, [data]);

  useEffect(() => {
    setTaskListInfo((val) => ({ ...val, isFetchingTaskType: isFetching }));
  }, [isFetching]);

  return (
    <TodoListContext.Provider value={taskListInfo!}>
      {props.children}
    </TodoListContext.Provider>
  );
};

export const useTodoList = () => {
  return useContext(TodoListContext);
};
