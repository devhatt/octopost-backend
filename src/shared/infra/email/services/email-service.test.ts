import { mock } from 'vitest-mock-extended';

import type { EmailAdapter } from '@/shared/infra/email/adapters/email-adapter';
import { EmailService } from '@/shared/infra/email/services/email-service';

describe('[Service] Email', () => {
  let emailAdapter: EmailAdapter;
  let emailService: EmailService;

  beforeEach(() => {
    emailAdapter = mock<EmailAdapter>({
      sendEmail: vi.fn(),
    });
    emailService = new EmailService(emailAdapter);
  });

  describe('List', () => {
    it('Should call the sendEmail method', async () => {
      const data = {
        parameters: { name: 'John Doe' },
        recipient: 'johndoe@example.com',
        subject: 'Test Subject',
        template: 'test-template',
      };

      await emailService.sendEmail(data);

      expect(emailAdapter.sendEmail).toBeCalledWith(data);
      expect(emailAdapter.sendEmail).toHaveBeenCalledTimes(1);
    });
  });
});
