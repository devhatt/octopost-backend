export type EmailModel = {
  [key: string]: unknown;
  recipient: string;
  subject: string;
  template: string;
};
