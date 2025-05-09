// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const response = { data: { posts: [] } };
  const url = '/posts';
  let getMock: jest.Mock;
  beforeEach(() => {
    getMock = jest.fn().mockResolvedValue(response);
    (axios.create as jest.Mock).mockReturnValue({
      get: getMock,
    });
  });

  afterEach(() => {
    throttledGetDataFromApi.cancel(); // Clean up throttled timeouts
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    // Write your test here
    const baseURL = 'https://jsonplaceholder.typicode.com';

    await throttledGetDataFromApi(url);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    await throttledGetDataFromApi(url);

    expect(getMock).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    // Write your test here
    const response = await throttledGetDataFromApi(url);

    expect(response).toEqual(response);
  });
});
