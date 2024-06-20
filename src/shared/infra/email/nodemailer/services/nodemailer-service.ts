import env from '@/config/env.js';
import type { EmailAdapter } from '@/shared/infra/email/adapters/email-adapter.js';
import type { EmailModel } from '@/shared/infra/email/models/email-model.js';
import { transporter } from '@/shared/infra/email/nodemailer/config/transporter.js';
import type { NodemailerRepository } from '@/shared/infra/email/nodemailer/repositories/nodemailer-repository.js';

export class NodemailerService implements EmailAdapter {
  constructor(private readonly nodemailerRepository: NodemailerRepository) {}
  async sendEmail(data: EmailModel): Promise<void> {
    const template = await this.nodemailerRepository.readTemplate(
      data.template
    );
    const html = this.nodemailerRepository.compileTemplate(template, data);

    const mailOptions = {
      from: env.EMAIL_USER,
      html: html,
      subject: data.subject,
      to: data.recipient,
    };

    await transporter.sendMail(mailOptions);
  }
}
