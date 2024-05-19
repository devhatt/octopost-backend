export interface EmailAdapter {
  sendEmail(template: string, recipient: string): Promise<void>;
}
