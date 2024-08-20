import { httpLogger } from '@/middlewares/logger/http-logger';

describe('HTTP logger', () => {
  it('should be defined', () => {
    expect(httpLogger).toBeDefined();
  });
});
