import type { UserModel } from '@/features/user/models/user-model';

export type UserCreateModel = Omit<UserModel, 'id'> & {
  repeatPassword: string;
};

export type UserCreateResponse = void;
