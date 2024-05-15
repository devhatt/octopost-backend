import type { EmailProvider } from '@/shared/infra/email/providers/email-provider.js';

export class EmailService {
  constructor(private readonly emailProvider: EmailProvider) {}

  async sendEmail(template: string, recipient: string): Promise<void> {
    await this.emailProvider.sendEmail(template, recipient);
  }
}
