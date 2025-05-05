// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    const [a, b] = [5, 10];
    const result = simpleCalculator({ a: a, b: b, action: Action.Add });
    expect(result).toBe(a + b);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    const [a, b] = [5, 10];
    const result = simpleCalculator({ a: a, b: b, action: Action.Add });
    expect(result).toBe(a + b);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    const [a, b] = [5, 10];
    const result = simpleCalculator({ a: a, b: b, action: Action.Multiply });
    expect(result).toBe(a * b);
  });

  test('should divide two numbers', () => {
    // Write your test here
    const [a, b] = [5, 10];
    const result = simpleCalculator({ a: a, b: b, action: Action.Divide });
    expect(result).toBe(a / b);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    const [a, b] = [5, 10];
    const result = simpleCalculator({
      a: a,
      b: b,
      action: Action.Exponentiate,
    });
    expect(result).toBe(a ** b);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    const [a, b] = [5, 10];
    const result = simpleCalculator({ a: a, b: b, action: 'invalidAction' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    const [a, b] = ['5', '10'];
    const result = simpleCalculator({ a: a, b: b, action: Action.Add });
    expect(result).toBeNull();
  });
});
