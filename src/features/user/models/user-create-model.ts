export type UserModel = {
  email: string;
  id: string;
  name: string;
  password: string;
  username: string;
};

export type UserCreateModel = Omit<UserModel, 'id'>;

export type UserCreateResponse = void;
