export type User = {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  // Add other fields as needed
};

export type SettingPayload = {
  emailEnabled: boolean;
  letterEnabled: boolean;
  preferredTime: string;
};

export type UpdateSettingDto = {
  emailEnabled?: boolean;
  letterEnabled?: boolean;
  preferredTime?: string;
};

export type AdminTriggerDto = {
  date?: string;
  userId?: number;
  channel?: 'email' | 'letter' | 'both';
};

export type AdminTriggerPayload = {
  runId: number;
  runAt: string;
  sentCount: number;
};

export type RecordsListDto = {
  page?: number;
  limit?: number;
  date?: string;
  userId?: number;
  status?: 'success' | 'failed';
  channel?: 'email' | 'letter';
};

export type RecordsListPayload = {
  page: number;
  result: any[];
  total: number;
};

export type NoticeRun = {
  id: number;
  runAt: string;
  triggeredBy: 'system' | 'admin';
  operator?: User;
  operatorId?: number | null;
  sentCount: number;
  createdAt: string;
};

export type RunsListDto = {
  page?: number;
  limit?: number;
};

export type RunsListPayload = {
  page: number;
  result: NoticeRun[];
  total: number;
};
