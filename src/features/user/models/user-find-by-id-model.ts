import type { UserModel } from '@/features/user/models/user-model';

export type UserFindByIdModel = {
  id: string;
};

export type UserFindByIdResponse = null | UserModel;
