export type UserModel = {
  email: string;
  id: string;
  password: string;
};

export type UserCreateModel = Omit<UserModel, 'id'>;

export type UserCreateResponse = void;
