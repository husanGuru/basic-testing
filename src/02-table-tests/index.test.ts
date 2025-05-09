// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 5, b: 1, action: Action.Subtract, expected: 4 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 8, b: 3, action: Action.Subtract, expected: 5 },

  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },

  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },

  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },

  // Invalid cases
  { a: 2, b: 5, action: 'wrong action', expected: null },
  { a: '2', b: 5, action: Action.Exponentiate, expected: null },
  { a: 2, b: '5', action: Action.Exponentiate, expected: null },
  // continue cases for other actions
];

describe('simpleCalculator', () => {
  // Consider to use Jest table tests API to test all cases above
  test.each(testCases)('$a $action $b', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
