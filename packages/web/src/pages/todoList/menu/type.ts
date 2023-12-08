import { ReactNode } from 'react';

export type TSearchTaskParams = {
  taskType: number;
  status: number;
  startTime: number;
  endTime: number;
  timeIndex: number;
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
