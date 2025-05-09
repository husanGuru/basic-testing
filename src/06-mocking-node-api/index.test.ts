// Uncomment the code below and write your tests
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    const delay = 1000;

    doStuffByTimeout(cb, delay);

    expect(setTimeoutSpy).toHaveBeenCalledWith(cb, delay);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const cb = jest.fn();
    const delay = 1000;

    doStuffByTimeout(cb, delay);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay);

    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    jest.spyOn(global, 'setInterval');

    const cb = jest.fn();
    const interval = 500;

    doStuffByInterval(cb, interval);

    expect(setInterval).toHaveBeenCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const cb = jest.fn();
    const interval = 500;
    doStuffByInterval(cb, interval);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval * 3);

    expect(cb).toHaveBeenCalledTimes(3);
  });
});

jest.mock('fs');
jest.mock('fs/promises');

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    const joinSpy = jest.spyOn(path, 'join');
    const pathToFile = 'test.txt';
    readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    (existsSync as jest.Mock).mockReturnValue(false);

    const pathToFile = 'test.txt';

    expect(await readFileAsynchronously(pathToFile)).toBe(null);
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    const pathToFile = 'test.txt';
    const fileContent = 'file content';

    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(fileContent);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContent);
  });
});
