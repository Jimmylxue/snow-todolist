import {
  UnorderedListOutlined,
  PlusOutlined,
  SearchOutlined,
  SkinOutlined,
  LoginOutlined,
  LogoutOutlined,
  FireOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { Dropdown, Input, MenuProps, Modal } from 'antd';
import { Avatar } from '../SAvatar';
import { SButton } from '../Button';
import { useUser } from '@/hooks/useAuth';
import { observer } from 'mobx-react-lite';
import { useCallback, useMemo, useState } from 'react';
import { TaskItem } from '@/api/todolist/task/type';
import { debounce } from 'lodash';
import { useSearchTask } from '@/api/todolist/task';
import { useSearchInfo } from '@/hooks/useSearch';
import './navbar.less';
import { Setting } from '../Setting';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const [settingShow, setSettingShow] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  const loginItems: MenuProps['items'] = [
    {
      key: '3',
      label: (
        <div
          className='ml-2'
          style={{
            width: 200,
          }}
          onClick={() => {
            modal.confirm({
              title: '确定退出登录吗',
              okText: '确定',
              cancelText: '取消',
              onOk: logOut,
            });
          }}>
          退出登录
        </div>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  const logoutItem: MenuProps['items'] = [
    {
      key: '3',
      label: (
        <div
          className='ml-2'
          style={{
            width: 200,
          }}
          onClick={checkUserLoginBeforeFn}>
          立即登录
        </div>
      ),
      icon: <LoginOutlined />,
    },
  ];

  const menuList = useMemo(() => {
    const baseMenu: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <div
            className='ml-2'
            style={{
              width: 200,
            }}
            onClick={() => {
              setSettingShow(true);
            }}>
            主题设置
          </div>
        ),
        icon: <SkinOutlined />,
      },
      {
        key: '2',
        label: (
          <div
            className='ml-2'
            style={{
              width: 200,
            }}
            onClick={() => {
              navigate('/updateRecord');
            }}>
            更新日志
          </div>
        ),
        icon: <FireOutlined />,
      },
    ];
    return baseMenu.concat(!user ? logoutItem : loginItems);
  }, [user, logoutItem, loginItems]);

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
      className='w-full px-5 flex-shrink-0 dz-navbar primaryNavBarBgColor'
      style={{
        height: 45,
      }}>
      <div className='w-full h-full flex items-center justify-between primaryTextColor'>
        {isHomePage ? (
          <div className='flex items-center'>
            <SButton
              icon={
                <UnorderedListOutlined className=' flex text-xl flex-shrink-0' />
              }
              onClick={onMenuClick}
            />
            <div className=' relative'>
              <Input
                className='dz-input ml-4 border-r-2 w-full primaryTextColor'
                placeholder='搜索'
                value={searchText}
                prefix={
                  <SearchOutlined
                    style={{
                      fontWeight: 300,
                    }}
                    className=' text-lg'
                  />
                }
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
        ) : (
          <div className=' flex items-center'>
            <SButton
              icon={<LeftOutlined className=' flex text-xl flex-shrink-0' />}
              onClick={() => {
                history.back();
              }}
            />
            <div className='ml-2 text-lg font-semibold'>DODD</div>
          </div>
        )}

        <div className='flex items-center'>
          {isHomePage && (
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
          )}

          <div className='ml-2'>
            <Dropdown menu={{ items: menuList }}>
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
      <Setting onClose={() => setSettingShow(false)} visible={settingShow} />
    </div>
  );
});
