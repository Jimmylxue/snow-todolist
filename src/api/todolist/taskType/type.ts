export type TAddTaskTypeParams = {
  typeName: string;
  desc: string;
  themeColor: string;
  icon: string;
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
  themeColor: string;
  icon: string;
};
