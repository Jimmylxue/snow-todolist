import {
  InfoCircleOutlined,
  SkinOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Theme } from './Theme';
import { Profile } from './Profile';
import { About } from './About';

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
  {
    key: 'about',
    name: '关于',
    icon: <InfoCircleOutlined />,
    component: <About />,
  },
];
