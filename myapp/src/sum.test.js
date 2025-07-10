import Sum from './Sum';

test('adds negative numbers', () => {
  expect(Sum(-5, -3)).toBe(-8);
});

test('adds zero correctly', () => {
  expect(Sum(0, 5)).toBe(5);
});