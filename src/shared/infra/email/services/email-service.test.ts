import { test } from 'vitest';
import type { EmailProvider } from '../providers/email-provider.js';
import { EmailService } from './email-service.js';

class MockEmailProvider implements EmailProvider {
  async sendEmail(template: string, recipient: string): Promise<void> {
    console.log(
      `Enviando e-mail para ${recipient} com o template: ${template}`
    );
  }
}

test('EmailService envia e-mail corretamente', async () => {
  const emailService = new EmailService(new MockEmailProvider());
  const template = 'template_de_teste';
  const recipient = 'teste@example.com';

  await emailService.sendEmail(template, recipient);

  expect(console.log).toHaveBeenCalledWith(
    `Enviando e-mail para ${recipient} com o template: ${template}`
  );
});

test('EmailService lida com erros de envio de e-mail', async () => {
  const mockEmailProvider: EmailProvider = {
    async sendEmail(_template: string, _recipient: string): Promise<void> {
      throw new Error('Erro ao enviar e-mail');
    },
  };

  const emailService = new EmailService(mockEmailProvider);
  const template = 'template_de_teste';
  const recipient = 'teste@example.com';

  // Act & Assert
  expect(
    async () => await emailService.sendEmail(template, recipient)
  ).toThrowError('Erro ao enviar e-mail');
});
