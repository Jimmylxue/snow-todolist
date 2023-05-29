import {
  CarryOutOutlined,
  CheckCircleOutlined,
  AlertOutlined,
} from '@ant-design/icons';

export const taskStatusListConst = [
  {
    statusName: '未完成',
    icon: (
      <AlertOutlined
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

export const menuListConst = [
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
  },
];
