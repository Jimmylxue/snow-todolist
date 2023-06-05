import {
  UnorderedListOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Dropdown, Input, MenuProps, Modal } from 'antd';
import { Avatar } from './SAvatar';
import { SButton } from './Button';
import './index.css';
import { useUser } from '@/hooks/useAuth';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { TaskItem } from '@/api/todolist/task/type';
import { debounce } from 'lodash';
import { useSearchTask } from '@/api/todolist/task';
import './style.less';
import { useSearchInfo } from '@/hooks/useSearch';

type TProps = {
  onMenuClick: () => void;
  onAddTask: () => void;
};

export const NavBar = observer(({ onMenuClick, onAddTask }: TProps) => {
  const { user, logOut, showLoginModal, checkUserLoginBeforeFn } = useUser();
  const [modal, contextHolder] = Modal.useModal();
  const [searchList, setSearchList] = useState<TaskItem[]>([]);
  const { mutateAsync } = useSearchTask();
  const { setSearchInfo } = useSearchInfo();
  const [searchText, setSearchText] = useState('');

  const loginItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => {
            modal.confirm({
              title: '确定退出登录吗',
              okText: '确定',
              cancelText: '取消',
              onOk: logOut,
            });
          }}>
          退出登录
        </a>
      ),
    },
  ];

  const logoutItem: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          onClick={checkUserLoginBeforeFn}>
          立即登录
        </a>
      ),
    },
  ];

  const searchFn = useCallback(
    debounce(async (e) => {
      const searchValue = e.target.value;
      setSearchText(searchValue);
      if (!searchValue) {
        return;
      }

      const res = await mutateAsync({ taskName: searchValue });
      if (res.code === 200) {
        setSearchList(res.result.result);
      }
    }, 500),
    [],
  );

  const changeFn = (e: any) => {
    setSearchText(e.target.value);
    searchFn(e);
  };

  return (
    <div
      className='w-full px-5 flex-shrink-0'
      style={{
        height: 45,
        backgroundColor: '#db4c3f',
      }}>
      <div className='w-full h-full flex items-center justify-between text-white'>
        <div className='flex items-center'>
          <SButton
            icon={
              <UnorderedListOutlined className=' flex text-xl flex-shrink-0' />
            }
            onClick={onMenuClick}
          />
          <div className=' relative'>
            <Input
              className='dz-input ml-4 border-r-2 w-full'
              placeholder='请输入'
              value={searchText}
              prefix={<SearchOutlined />}
              onChange={changeFn}
              style={{
                width: 300,
              }}
            />
            {!!searchList.length && (
              <div
                className=' absolute left-0 top-8 ml-4 bg-white z-30'
                style={{
                  width: 300,
                }}>
                {searchList.map((task, index) => (
                  <div
                    key={index}
                    className='snow-search-item-hover text-black flex justify-between py-2 px-2 text-xs cursor-pointer'
                    onClick={() => {
                      setSearchInfo(task);
                      setSearchList([]);
                      setSearchText('');
                    }}>
                    <div>
                      {task.taskName.length > 18
                        ? task.taskName.slice(0, 18) + '...'
                        : task.taskName}
                    </div>
                    <div>{task.typeMessage.typeName}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='flex items-center'>
          <SButton
            className='ml-2'
            icon={<PlusOutlined className=' flex text-xl flex-shrink-0' />}
            onClick={() => {
              if (user?.id) {
                onAddTask();
                return;
              }
              showLoginModal();
            }}
          />
          <div className='ml-2'>
            <Dropdown menu={{ items: user ? loginItems : logoutItem }}>
              <Avatar
                userName={user?.username!}
                avatar={user?.avatar}
                showAvatar={false}
              />
            </Dropdown>
          </div>
        </div>
      </div>
      {contextHolder}
    </div>
  );
});
