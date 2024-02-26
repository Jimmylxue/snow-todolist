import { TUpdateSignParams } from '@/api/sign/habit';
import { THabitDetail } from '@/api/sign/habit/type';
import moment, { Moment } from 'moment';

/**
 * 检查日期是否超过今天的日期
 */
export function checkIsOverToday(checkMoment: Moment) {
  const todayMoment = moment();
  return checkMoment.valueOf() > todayMoment.valueOf();
}

export function getDateInfo(current: Moment, item: Moment) {
  /** 遍历项的天 */
  const itemCurrent = item.date();
  /** 遍历项的月 */
  const itemCurrentMonth = item.month();
  /** 遍历项的年 */
  const itemCurrentYear = item.year();

  /** 当前的天 */
  const nowDay = current.date();
  /** 当前的月 */
  const nowMonth = current.month();
  /** 当前的年 */
  const nowYear = current.year();

  /** 渲染的项是否是当天 */
  const renderIsNowDay =
    itemCurrent === nowDay &&
    nowYear === itemCurrentYear &&
    nowMonth === itemCurrentMonth;

  /** 渲染项是否大于当前时间 */
  const isOverToday = checkIsOverToday(item);

  const isNotNowMonth = itemCurrentMonth !== nowMonth;
  const isNotNowYear = itemCurrentYear !== nowYear;

  return {
    renderIsNowDay,
    isOverToday,
    isNotNowMonth,
    isNotNowYear,
    itemCurrent,
    itemCurrentMonth,
  };
}

export function getDateIsComplete(checkDate: Moment, habDetail: THabitDetail) {
  const checkDateString = checkDate.format('YYYY-MM-DD');
  return habDetail?.records
    .map((item) => item.signDate)
    .includes(checkDateString);
}
