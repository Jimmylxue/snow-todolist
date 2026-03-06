import {
  CarryOutOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { STime, TSliderTime } from './type';

export const taskStatusListConst = [
  {
    statusName: '未完成',
    icon: (
      <ExclamationCircleOutlined
        className='text-lg '
        style={{
          color: '#e67e22',
        }}
      />
    ),
  },
  {
    statusName: '已完成',
    icon: (
      <CheckCircleOutlined
        className='text-lg '
        style={{
          color: '#2ecc71',
        }}
      />
    ),
  },
];

export const timeListConst: TSliderTime[] = [
  {
    icon: (
      <CarryOutOutlined
        className='text-lg flex flex-shrink-0'
        style={{
          color: '#1abc9c',
        }}
      />
    ),
    text: '近7天',
    message: 2,
    type: STime.近七天,
  },
  {
    icon: (
      <CarryOutOutlined
        className='text-lg flex flex-shrink-0'
        style={{
          color: '#3498db',
        }}
      />
    ),
    text: '昨天',
    message: 2,
    type: STime.昨天,
  },
  {
    icon: (
      <CarryOutOutlined
        className='text-lg flex flex-shrink-0'
        style={{
          color: '#f1c40f',
        }}
      />
    ),
    text: '今天',
    message: 3,
    type: STime.今天,
  },
  {
    icon: (
      <CarryOutOutlined
        className='text-lg flex flex-shrink-0'
        style={{
          color: '#e74c3c',
        }}
      />
    ),
    text: '自定义',
    message: 2,
    type: STime.自定义,
  },
];
