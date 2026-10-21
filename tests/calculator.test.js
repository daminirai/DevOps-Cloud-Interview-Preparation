const { add, subtract, multiply, isPrime } = require('../src/services/calculator');

describe('calculator utility', () => {
  test('adds two numbers correctly', () => {
    expect(add(5, 3)).toBe(8);
    expect(add(-2, 4)).toBe(2);
  });

  test('subtracts two numbers correctly', () => {
    expect(subtract(10, 4)).toBe(6);
    expect(subtract(2, 9)).toBe(-7);
  });

  test('multiplies two numbers correctly', () => {
    expect(multiply(6, 7)).toBe(42);
    expect(multiply(-3, 4)).toBe(-12);
  });

  test('detects prime numbers correctly', () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(17)).toBe(true);
    expect(isPrime(1)).toBe(false);
    expect(isPrime(9)).toBe(false);
    expect(isPrime(21)).toBe(false);
  });

  test('returns false for non-integer or negative values in isPrime', () => {
    expect(isPrime(-5)).toBe(false);
    expect(isPrime(0)).toBe(false);
    expect(isPrime(2.5)).toBe(false);
    expect(isPrime('7')).toBe(true);
  });
});
