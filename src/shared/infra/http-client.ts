import axios from 'axios';
import type { AxiosError } from 'axios';
import type {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from '../protocols/http-client';

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpClientRequest): Promise<HttpClientResponse> {
    try {
      const response = await axios({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      });

      return {
        statusCode: response.status,
        body: response.data,
      };
    } catch (error) {
      return {
        statusCode: (error as AxiosError).response!.status,
        body: (error as AxiosError).response!.data,
      };
    }
  }
}
