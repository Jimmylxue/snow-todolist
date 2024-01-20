import { SkinOutlined, SmileOutlined } from '@ant-design/icons';
import { Theme } from './Theme';
import { Profile } from './Profile';

/**
 * 设置的功能集合
 */
export const setting = [
  {
    key: 'profile',
    name: '账户',
    icon: <SmileOutlined />,
    component: <Profile />,
  },
  {
    key: 'theme',
    name: '主题',
    icon: <SkinOutlined />,
    component: <Theme />,
  },
];
