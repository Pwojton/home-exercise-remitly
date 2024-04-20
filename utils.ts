export function isStringArray(arr: any[]): arr is string[] {
  return Array.isArray(arr) && arr.every((item) => typeof item === 'string');
}
