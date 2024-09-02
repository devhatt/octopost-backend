export type TwitterTokenResponse = {
  access_token: string;
  expires_in: 7200;
  scope: string;
  token_type: 'bearer';
};

export type TwitterPostResponse = {
  file?: File;
  text?: string;
};

export type TwitterUser = {
  id: string;
  name: string;
  username: string;
};
