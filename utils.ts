export function isArrayOfType<T>(arr: any[], predicate: (value: any) => value is T): arr is T[] {
  return Array.isArray(arr) && arr.every(predicate);
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isObject(value: any): value is object {
  return typeof value === 'object';
}
