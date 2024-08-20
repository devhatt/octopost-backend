export type AccountModel = {
  avatarUrl: string;
  createdAt: Date;
  id: string;
  socialMediaId: null | number;
  updatedAt: Date;
  userId: null | string;
};

export type UpsertParams = {
  accessToken: string;
  accountId: string;
  authToken: string;
  expiresIn: number;
};
