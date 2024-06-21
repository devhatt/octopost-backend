export type EmailModel = Record<string, unknown> & {
  recipient: string;
  subject: string;
  template: string;
};
