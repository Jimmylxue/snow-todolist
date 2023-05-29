import { TaskType } from '@/api/todolist/taskType/type';
import dayjs from 'dayjs';

export function getTimeByIndex(timeIndex: number) {
  let startTime = 0,
    endTime = 0;
  switch (timeIndex) {
    case 2:
      // 今天
      startTime = dayjs().startOf('D').valueOf();
      endTime = dayjs().endOf('D').valueOf();
      return [startTime, endTime];
    case 1:
      // 昨天
      startTime = dayjs().subtract(1, 'day').startOf('D').valueOf();
      endTime = dayjs().subtract(1, 'day').endOf('D').valueOf();
      return [startTime, endTime];
    case 0:
      // 近七天
      startTime = dayjs().subtract(7, 'day').startOf('D').valueOf();
      endTime = dayjs().endOf('D').valueOf();
      return [startTime, endTime];
  }
  return [startTime, endTime];
}

export function getStatusByIndex(status: number) {
  return { status };
}

export function getTaskTypeByIndex(index: number, taskTypeList: TaskType[]) {
  return {
    taskType: taskTypeList?.[index]?.typeId,
  };
}

export function getTimeStringByDate(
  date: string,
  flag: 'start' | 'end' = 'start',
): number {
  if (flag === 'start') {
    return dayjs(date).startOf('D').valueOf();
  }
  return dayjs(date).endOf('D').valueOf();
}

export function getCurrentMonthsTime() {
  return [
    dayjs().subtract(1, 'months').startOf('D').valueOf(),
    dayjs().endOf('D').valueOf(),
  ];
}

export function getRandomColor(index: number) {
  const colorList = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#95a5a6',
  ];
  return colorList[index % colorList.length];
}
