import {
  FilterOutlined,
  HistoryOutlined,
  RadarChartOutlined,
} from '@ant-design/icons';

export type TabKey = '/center' | '/base';

export const TabConst = [
  {
    label: (
      <>
        <FilterOutlined />
        备忘中心
      </>
    ),
    key: '/center',
  },
  // {
  //   label: (
  //     <>
  //       <HistoryOutlined />
  //       打卡中心
  //     </>
  //   ),
  //   key: '/habit',
  // },
  // {
  //   label: (
  //     <>
  //       <RadarChartOutlined />
  //       备忘概况
  //     </>
  //   ),
  //   key: '/base',
  // },
];
