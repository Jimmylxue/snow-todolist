import { Moment } from 'moment';

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
  const isOverToday = item.valueOf() > current.valueOf();

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
