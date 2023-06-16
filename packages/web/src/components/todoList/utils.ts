import dayjs from 'dayjs';
import moment from 'moment';
import { STime } from './SliderBar/type';
import confetti from 'canvas-confetti';

export function getTimeTextByIndex(index?: number) {
  switch (index) {
    case STime.今天:
      return '今天';
    case STime.昨天:
      return '昨天';
    case STime.近七天:
      return '近七天';
    case STime.自定义:
      return '自定义时间';
    default:
      return '其他时间';
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

export function getTimeByMoment(moments: any, type: 'start' | 'end' = 'start') {
  if (type === 'start') {
    return moment(moments).startOf('day').valueOf();
  }
  return moment(moments).endOf('day').valueOf();
}

export function showFireAnimate(timeOut: number = 1500) {
  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
  };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  // @ts-ignore
  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2,
        },
      }),
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2,
        },
      }),
    );
  }, 250);

  setTimeout(() => {
    clearInterval(interval);
  }, timeOut);
}
