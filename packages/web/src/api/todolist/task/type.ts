import { TaskType } from '../taskType/type';

export type TaskItem = {
  taskId: number;
  userId: number;
  typeId: number;
  status: 1 | 0;
  taskName: string;
  taskContent: string;
  completeTime: string;
  createTime: string;
  updateTime: string;
  typeMessage: TaskType;
};

export type TAddTaskParams = {
  userId?: number;
  typeId: number;
  taskName: string;
  taskContent: string;
};

export type TUpdateTaskStatusParams = {
  userId?: number;
  taskId: number;
  status?: number;
};

export type TUpdateTaskParams = {
  userId?: number;
  taskId: number;
  status?: number;
  taskName?: string;
  taskContent?: string;
  typeId?: number;
};

export type TDelTaskParams = {
  taskId: number;
};

export type TUserTaskList = {
  total: number;
  result: TaskItem[];
  page: number;
  typeId?: number;
};

export type TSearchTaskParams = {
  taskName: string;
};
