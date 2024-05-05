import type { EmailProvider } from '@/shared/infra/email/providers/email-provider.js';

export class EmailService {
  private emailProvider: EmailProvider;

  constructor(emailProvider: EmailProvider) {
    this.emailProvider = emailProvider;
  }

  async sendEmail(template: string, recipient: string): Promise<void> {
    await this.emailProvider.sendEmail(template, recipient);
  }
}
