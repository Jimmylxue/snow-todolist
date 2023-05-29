import { CarryOutOutlined } from '@ant-design/icons';
export const menuListConst = [
  {
    icon: (
      <CarryOutOutlined
        className='text-lg flex flex-shrink-0'
        style={{
          color: '#3a8335',
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
          color: '#3a8335',
        }}
      />
    ),
    text: '昨天',
    message: 2,
  },
];

export const taskListConst = [
  {
    taskName: '打扫房间卫生',
    desc: '自己房间',
    taskType: '生活',
  },
  {
    taskName: '写段js程序',
    desc: '完成公司任务',
    taskType: '工作',
  },
];

export const taskTypeListConst = [
  {
    typeName: '工作',
  },
  {
    typeName: '生活',
  },
];
