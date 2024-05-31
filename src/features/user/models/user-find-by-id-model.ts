import type { UserModel } from './user-create-model.js';

export type UserFindByIdModel = {
  id: string;
};

export type UserFindByIdResponse = null | UserModel;
