import type { UserModel } from '@/features/user/models/user-model.js';

export type UserFindByIdModel = {
  id: string;
};

export type UserFindByIdResponse = null | UserModel;
