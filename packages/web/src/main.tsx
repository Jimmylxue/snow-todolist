import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoList } from './pages/todoList';
import 'tailwindcss/tailwind.css';
import './index.css';
import './var.less';
import { config } from './config/react-query';
import 'animate.css';
import { useTheme } from './config/theme';
const Root = function () {
  const { queryClient, QueryClientProvider } = config();
  const { initTheme } = useTheme();

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <React.StrictMode>
      {/* // react 18 版本 useEffect 会执行两次 不需要可以先注释掉 */}
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/' element={<TodoList />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />,
);
