import { faker } from '@faker-js/faker';
import { mock } from 'vitest-mock-extended';

import type { HttpAdapter } from '@/shared/infra/http/http-adapter';
import type { Logger } from '@/shared/infra/logger/logger';
import { httpAdapterMock } from '@/shared/test-helpers/mocks/http-adapter.mock';
import { loggerMock } from '@/shared/test-helpers/mocks/logger.mock';

import { TwitterService } from './twitter-service';

describe('[Service] Twitter Service', () => {
  let twitterService: TwitterService;

  let mockLogger: Logger;
  let mockHttp: HttpAdapter;

  beforeEach(() => {
    mockLogger = mock<Logger>(loggerMock);
    mockHttp = mock(httpAdapterMock);

    twitterService = new TwitterService(mockLogger, mockHttp);
  });

  describe('getTwitterOAuthToken', () => {
    it('return data with success', async () => {
      const input = faker.string.alpha({ length: 10 });

      vi.spyOn(mockHttp, 'post').mockResolvedValueOnce({
        data: {
          access_token: faker.string.alpha({ length: 10 }),
          expires_in: 7200,
          scope: faker.string.alpha({ length: 10 }),
          token_type: 'bearer',
        },
        status: 200,
        statusText: 'OK',
      });

      const result = await twitterService.getTwitterOAuthToken(input);

      expect(mockLogger.info).toBeCalled();
      expect(result).toEqual({
        access_token: expect.any(String),
        expires_in: 7200,
        scope: expect.any(String),
        token_type: 'bearer',
      });
    });

    it('error on post', async () => {
      const input = faker.string.alpha({ length: 10 });

      vi.spyOn(mockHttp, 'post').mockRejectedValueOnce(
        new Error('Error on post')
      );

      await expect(
        twitterService.getTwitterOAuthToken(input)
      ).rejects.toThrowError('Error on post');
      expect(mockLogger.error).toBeCalledWith(
        'Error on getTwitterOAuthToken in twitter service -Error: Error on post'
      );
    });
  });

  describe('getTwitterUser', () => {
    it('return data with success', async () => {
      const input = faker.string.alpha({ length: 10 });

      vi.spyOn(mockHttp, 'get').mockResolvedValueOnce({
        data: {
          data: {
            id: faker.string.alpha(),
            name: faker.string.alpha(),
            username: faker.internet.userName(),
          },
        },
        status: 200,
        statusText: 'OK',
      });

      const result = await twitterService.getTwitterUser(input);

      expect(mockLogger.info).toBeCalled();
      expect(result).toEqual({
        id: expect.any(String),
        name: expect.any(String),
        username: expect.any(String),
      });
    });

    it('error on get', async () => {
      const input = faker.string.alpha({ length: 10 });

      vi.spyOn(mockHttp, 'get').mockRejectedValueOnce(
        new Error('Error on get')
      );

      await expect(twitterService.getTwitterUser(input)).rejects.toThrowError(
        'Error on get'
      );
      expect(mockLogger.error).toBeCalledWith(
        'Error on getTwitterUser in twitter service -Error: Error on get'
      );
    });
  });
});
