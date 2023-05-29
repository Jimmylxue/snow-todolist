import dayjs from 'dayjs';

export function getTimeTextByIndex(index?: number) {
  switch (index) {
    case 2:
      return '今天';
    case 1:
      return '昨天';
    case 0:
      return '近七天';
    default:
      return '自定义时间';
  }
}

export function getFullTimeByIndex(
  index?: number,
  startTime?: number,
  endTime?: number,
) {
  switch (index) {
    case 2:
      return dayjs().format('YYYY-MM-DD');
    case 1:
      return dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    case 0:
      return `${dayjs()
        .subtract(7, 'day')
        .format('YYYY-MM-DD')} - ${dayjs().format('YYYY-MM-DD')}`;
    default:
      return (
        dayjs(startTime).format('YYYY-MM-DD') +
        '~' +
        dayjs(endTime).format('YYYY-MM-DD')
      );
  }
}
