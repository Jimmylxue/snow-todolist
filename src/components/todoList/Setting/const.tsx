import {
  InfoCircleOutlined,
  SkinOutlined,
  SmileOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Theme } from './Theme';
import { Profile } from './Profile';
import { About } from './About';
import { Notice } from './Notice';

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
    key: 'notice',
    name: '通知',
    icon: <BellOutlined />,
    component: <Notice />,
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
