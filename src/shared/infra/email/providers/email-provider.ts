export interface EmailProvider {
  sendEmail(template: string, recipient: string): Promise<void>;
}
