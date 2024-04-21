export function isArrayOfType<T>(arr: unknown[], predicate: (value: unknown) => value is T): arr is T[] {
  return Array.isArray(arr) && arr.every(predicate);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isObject(value: unknown): value is object {
  return typeof value === 'object';
}
