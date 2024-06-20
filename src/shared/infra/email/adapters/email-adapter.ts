import type { EmailModel } from '@/shared/infra/email/models/email-model.js';

export interface EmailAdapter {
  sendEmail(data: EmailModel): Promise<void>;
}
