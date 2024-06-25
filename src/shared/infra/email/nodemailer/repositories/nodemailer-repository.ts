import fs from 'node:fs';
import path from 'node:path';

import Handlebars from 'handlebars';

import { InternalServerError } from '@/shared/errors/internal-server-error';

export class NodemailerRepository {
  compileTemplate(source: string, data: unknown): string {
    try {
      const compiledTemplate = Handlebars.compile(source);
      return compiledTemplate(data);
    } catch {
      throw new InternalServerError('template compilation failed');
    }
  }

  readTemplate(templateName: string): Promise<string> {
    try {
      const templatePath = path.resolve(
        import.meta.dirname,
        '../../templates',
        `${templateName}.html`
      );
      return fs.promises.readFile(templatePath, 'utf8');
    } catch {
      throw new InternalServerError('template file read failed');
    }
  }
}
