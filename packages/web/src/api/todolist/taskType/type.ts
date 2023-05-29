export type TAddTaskTypeParams = {
  typeName: string;
  desc: string;
};

export type TDelTaskTypeParams = {
  typeId: number;
};

export type TUpdateTaskTypeParams = TAddTaskTypeParams & TDelTaskTypeParams;

export type TaskType = {
  typeId: number;
  userId: number;
  typeName: string;
  desc: string;
  createTime: string;
  updateTime: string;
};
