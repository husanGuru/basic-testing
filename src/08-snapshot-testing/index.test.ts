// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    // Write your test here
    const list = generateLinkedList([1]);

    const expectedList = { value: 1, next: { value: null, next: null } };

    expect(list).toStrictEqual(expectedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    const list = generateLinkedList([1, 2]);

    expect(list).toMatchSnapshot();
  });
});
