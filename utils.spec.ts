import { isArrayOfType, isObject, isString } from './utils';

describe('isString', () => {
  it('should return true when value is string', () => {
    expect(isString('test')).toBe(true);
  });
  it('should return false when value is not string', () => {
    expect(isString(45)).toBe(false);
    expect(isString({})).toBe(false);
  });
});

describe('isObject', () => {
  it('should return true when value is object', () => {
    expect(isObject({})).toBe(true);
  });
  it('should return false when value is not object', () => {
    expect(isObject(45)).toBe(false);
    expect(isObject([])).toBe(false);
  });
});

describe('isArrayOfType', () => {
  it('should return true when values in array are in required type', () => {
    expect(isArrayOfType<string>(['test', 'test'], isString)).toBe(true);
    expect(isArrayOfType<object>([{}, {}], isObject)).toBe(true);
  });
  it('should return false when values in array arent in required type', () => {
    expect(isArrayOfType<string>(['test', {}], isString)).toBe(false);
    expect(isArrayOfType<object>([{}, {}, 13], isObject)).toBe(false);
    expect(isArrayOfType<object>([[{}, {}]], isObject)).toBe(false);
  });
});
