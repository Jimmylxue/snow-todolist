import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { TodoList } from './pages/todoList';
import 'tailwindcss/tailwind.css';
import './var.less';
import { config } from './config/react-query';
import 'animate.css';
import { UpdateRecord } from './pages/updateRecord';
import {
  TodoListProvider,
  todoListAuth,
  useWelcome,
  SearchProvider,
} from './hooks';
import { NavBar } from './components/todoList';
import { Login } from './components/common/Login';
import { TaskItem } from './api/todolist/task/type';
import { ThemeProvider } from './hooks/useTheme';
import { BaseInfo } from './pages/baseInfo';
import { HabitPage } from './pages/habit';
const Root = function () {
  const { queryClient, QueryClientProvider } = config();
  const taskModalType = useRef<'ADD' | 'EDIT'>('ADD');
  const selectTask = useRef<TaskItem>();
  const currentChooseTaskType = useRef<number>();
  const [taskModalShow, setTaskModalShow] = useState<boolean>(false);
  const { node: welcomeNode } = useWelcome();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TodoListProvider>
            <SearchProvider>
              <div className=' w-screen h-screen flex flex-col relative primaryPageBackgroundColor'>
                <Router>
                  <NavBar
                    onAddTask={() => {
                      taskModalType.current = 'ADD';
                      selectTask.current = void 0;
                      currentChooseTaskType.current = void 0;
                      setTaskModalShow(true);
                    }}
                  />
                  <Routes>
                    <Route
                      path='/center'
                      element={
                        <TodoList
                          taskModalShow={taskModalShow}
                          onCloseTaskModal={() => {
                            setTaskModalShow(false);
                          }}
                          opOpenTaskModal={() => {
                            setTaskModalShow(true);
                          }}
                        />
                      }
                    />
                    <Route path='/base' element={<BaseInfo />} />
                    <Route path='/updateRecord' element={<UpdateRecord />} />
                    <Route path='/habit' element={<HabitPage />} />
                    <Route
                      path='*'
                      element={<Navigate to='/center' replace />}
                    />
                  </Routes>
                </Router>
              </div>
              <Login onClose={() => todoListAuth.setShouldLoginStatus(false)} />
              {welcomeNode}
            </SearchProvider>
          </TodoListProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />,
);
