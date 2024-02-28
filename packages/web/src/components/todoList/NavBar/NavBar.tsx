import {
  PlusOutlined,
  LoginOutlined,
  LogoutOutlined,
  FireOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Dropdown, MenuProps, Modal } from 'antd';
import { Avatar } from '../SAvatar';
import { SButton } from '../Button';
import { useUser } from '@/hooks/useAuth';
import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import './navbar.less';
import { Setting } from '../Setting';
import { useLocation, useNavigate } from 'react-router-dom';
import { STabs } from '../Tabs';
import { Letter } from './components/Letter';
import { Search } from '../Search';

type TProps = {
  onAddTask: () => void;
};

export const NavBar = observer(({ onAddTask }: TProps) => {
  const { user, logOut, showLoginModal, checkUserLoginBeforeFn } = useUser();
  const [modal, contextHolder] = Modal.useModal();
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
            设置
          </div>
        ),
        icon: <SettingOutlined />,
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

  return (
    <div
      className='w-full px-5 flex-shrink-0 dz-navbar primaryNavBarBgColor'
      style={{
        height: 45,
      }}>
      <div className='w-full h-full flex items-center justify-between primaryTextColor'>
        <div className='flex items-center'>
          <img
            className=' rounded cursor-pointer'
            src='https://image.jimmyxuexue.top/img/202306061406698.jpg'
            width={25}
            alt=''
            onClick={() => navigate('center')}
          />
          <STabs />
        </div>

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

          <div className='flex items-center ml-2'>
            <Search />
            <Letter />
            <Dropdown menu={{ items: menuList }}>
              <Avatar
                userName={user?.username!}
                avatar={user?.avatar}
                showAvatar={true}
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
