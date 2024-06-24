import type { EmailAdapter } from '@/shared/infra/email/adapters/email-adapter';

export class EmailService {
  constructor(private readonly emailAdapter: EmailAdapter) {}

  async sendEmail(template: string, recipient: string): Promise<void> {
    await this.emailAdapter.sendEmail(template, recipient);
  }
}
