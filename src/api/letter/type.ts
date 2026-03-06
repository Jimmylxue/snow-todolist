export enum EReadStatus {
  未读 = 1,
  已读,
}

type TLetter = {
  letterId: number;
  platform: number;
  title: string;
  content: string;
  createdTime: string;
};

export type TUserLetter = {
  recordId: number;
  status: EReadStatus;
  createdTime: string;
  letter: TLetter;
};
