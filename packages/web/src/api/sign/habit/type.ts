export enum EStatus {
  '进行中' = 1,
  '已归档',
}

export enum EFrequency {
  '按天',
  '按周',
}

export enum ETarget {
  永远 = 1,
  '7天' = 2,
  '21天' = 3,
  '300天' = 4,
  '365天' = 5,
}

export enum ENotifyTime {
  '6:00' = 1,
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
}

export type THabit = {
  habitId: number;
  name: string;
  desc: string;
  target: ETarget;
  frequency: EFrequency;
  frequencyDay: string;
  frequencyWeek: number;
  notifyFlag: boolean;
  notifyTime: ENotifyTime;
  status: EStatus;
  createdTime: string;
  updateTime: string;
};

export type TUserHabit = THabit & {
  nearWeekInfo: {
    date: string;
    dayOfWeek: string;
    isSign: boolean;
  }[];
};

export type THabitDetail = {
  monthCount: number;
  allCount: number;
  monthRate: string;
  monthContinuityCount: number;
  records: {
    checkInId: number;
    signDate: string;
    signYear: string;
    signMonth: string;
    signDay: string;
    createdTime: string;
    updateTime: string;
    habit: THabit;
  }[];
};

export type TAddHabit = {
  name: string;
  frequency: number;
  frequencyDay?: string;
  frequencyWeek?: number;
  notifyFlag: boolean;
  notifyTime: number;
};

export type TEditHabit = TAddHabit & { habitId: number };
