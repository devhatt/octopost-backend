import { env } from '@/config/env';
import type { EmailAdapter } from '@/shared/infra/email/adapters/email-adapter';
import type { EmailModel } from '@/shared/infra/email/models/email-model';
import { transporter } from '@/shared/infra/email/nodemailer/config/transporter';
import type { NodemailerRepository } from '@/shared/infra/email/nodemailer/repositories/nodemailer-repository';

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
