export type TUserLoginParams = {
  phone: string;
  password: string;
};

export type TUserRegisterParams = TUserLoginParams & {
  username: string;
};

export type TUpdateTaskParams = {
  userId?: number;
  taskId: number;
  status: number;
};
