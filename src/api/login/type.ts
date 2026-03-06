export type TUserLoginParams = {
  phone: string;
  password: string;
};

export type TUserLoginByMailParams = {
  mail: string;
  code: string;
};

export type TUserRegisterParams = TUserLoginParams & {
  username: string;
};

export type TUserRegisterByMailParams = TUserLoginByMailParams & {
  username: string;
};

export type TUpdateTaskParams = {
  userId?: number;
  taskId: number;
  status: number;
};
