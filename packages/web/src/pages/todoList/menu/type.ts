import { ReactNode } from 'react';

export type TSearchTaskParams = {
  taskType: number;
  status: number | undefined;
  startTime: number;
  endTime: number;
  timeIndex: number;
  filterType: 1 | 2; // 1: 创建时间, 2: 预期完成时间
};

export enum STime {
  近七天,
  昨天,
  今天,
  自定义,
}

export type TSliderTime = {
  icon: ReactNode;
  text: string;
  message: number;
  type: STime;
};
