import type { EmailAdapter } from '@/shared/infra/email/adapters/email-adapter.js';
import type { EmailModel } from '@/shared/infra/email/models/email-model.js';

export class EmailService {
  constructor(private readonly emailAdapter: EmailAdapter) {}

  async sendEmail(data: EmailModel): Promise<void> {
    await this.emailAdapter.sendEmail(data);
  }
}
