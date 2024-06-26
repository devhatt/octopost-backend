export type EmailModel = {
  parameters: Record<string, unknown>;
  recipient: string;
  subject: string;
  template: string;
};
