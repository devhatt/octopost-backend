import { Logger } from '@/shared/infra/logging/logger';

const logger = new Logger(process.env['MODE'] ?? 'DEV');
export { logger };
