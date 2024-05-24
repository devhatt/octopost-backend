export type UserModel = {
  email: string;
  id: string;
  name: string;
  password: string;
  repeatPassword: string;
  username: string;
};

export type UserCreateModel = Omit<UserModel, 'id'> & {
  repeatPassword: string;
};

export type UserCreateResponse = void;
