import env from '@/config/env.js';
import { NodemailerService } from './nodemailer-service.js';
import { transporter } from '@/shared/infra/email/nodemailer/config/transporter.js';
import type { SentMessageInfo } from 'nodemailer';

describe('NodemailerService', () => {
  it('sends email correctly', async () => {
    const mockNodemailerRepository = {
      compileTemplate: vi.fn().mockReturnValue('<html>Hello, World!</html>'),
      readTemplate: vi.fn().mockResolvedValue('<html>Hello, World!</html>'),
    };

    const mockTransporterSendMail = vi
      .spyOn(transporter, 'sendMail')
      .mockResolvedValue({
        accepted: ['recipient@example.com'],
        envelope: {},
        messageId: 'message-id',
        pending: [],
        rejected: [],
      } as SentMessageInfo);

    const emailData = {
      recipient: 'recipient@example.com',
      subject: 'Test Subject',
      template: 'test-template',
    };

    const nodemailerService = new NodemailerService(mockNodemailerRepository);

    await nodemailerService.sendEmail(emailData);

    expect(mockNodemailerRepository.readTemplate).toHaveBeenCalledWith(
      'test-template'
    );
    expect(mockNodemailerRepository.compileTemplate).toHaveBeenCalledWith(
      '<html>Hello, World!</html>',
      emailData
    );
    expect(mockTransporterSendMail).toHaveBeenCalledWith({
      from: env.EMAIL_USER,
      html: '<html>Hello, World!</html>',
      subject: 'Test Subject',
      to: 'recipient@example.com',
    });
    vi.restoreAllMocks();
  });
});
