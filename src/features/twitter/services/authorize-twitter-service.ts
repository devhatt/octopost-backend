import type { Logger } from '@/shared/infra/logger/logger';
import type { Service } from '@/shared/protocols/service';

export class AuthorizeTwitterService implements Service<any, any> {
  constructor(private readonly logger: Logger) {}

  execute(_: any) {
    this.logger.info('Inicialize authorize twitter service');
  }
}
