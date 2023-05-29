var dayjs = require('dayjs');

export function getTimes(format: string = 'YYYY-MM-DD'): string {
  return dayjs().format(format);
}

export function diffTime(date1Str, date2Str, type = 'day') {
  // return dayjs(date1)
  const date1 = dayjs(date1Str);
  const date2 = dayjs(date2Str);

  return date1.diff(date2, type);
}
