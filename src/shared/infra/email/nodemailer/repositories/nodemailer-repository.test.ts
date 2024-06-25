import fs from 'node:fs';
import path from 'node:path';

import { InternalServerError } from '@/shared/errors/internal-server-error';

import { NodemailerRepository } from './nodemailer-repository';

const makeSut = () => {
  const repository = new NodemailerRepository();

  return { repository };
};

describe('[Repositories] NodemailerRepository', () => {
  describe('compileTemplate', () => {
    it('returns compiled template', () => {
      const { repository } = makeSut();

      const template = 'Hello, {{name}}!';
      const data = {
        name: 'Matheus Melo',
      };

      const compiledTemplate = repository.compileTemplate(template, data);
      expect(compiledTemplate).toBe('Hello, Matheus Melo!');
    });

    it('throws InternalServerError when template compilations fails', () => {
      const { repository } = makeSut();

      const invalidTemplate = '{{#if}} Invalid template {{/if}}';
      const data = {};

      expect(() => repository.compileTemplate(invalidTemplate, data)).toThrow(
        InternalServerError
      );
    });
  });

  describe('readTemplate', () => {
    it('returns the content of the template file', async () => {
      const { repository } = makeSut();

      const templateName = 'test-template';
      const templateContent = '<html>Hello, World!</html>';
      const templatePath = path.resolve(
        import.meta.dirname,
        '../../templates',
        `${templateName}.html`
      );

      const readFileSyncMock = vi
        .spyOn(fs.promises, 'readFile')
        .mockResolvedValue(templateContent);

      const content = await repository.readTemplate(templateName);
      expect(content).toBe(templateContent);
      expect(fs.promises.readFile).toHaveBeenCalledWith(templatePath, 'utf8');

      readFileSyncMock.mockRestore();
    });

    it('throws InternalServerError when the tempolate file cannot be read', async () => {
      const { repository } = makeSut();

      const templateName = 'test-template';
      const errorMessage = 'template file read failed';

      vi.spyOn(fs.promises, 'readFile').mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(repository.readTemplate(templateName)).rejects.toThrowError(
        new InternalServerError(errorMessage)
      );

      vi.restoreAllMocks();
    });
  });
});
