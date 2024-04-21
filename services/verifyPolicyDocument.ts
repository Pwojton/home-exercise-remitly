import { PolicyDocument } from '../types';
import { isArrayOfType, isObject } from '../utils';

export const verifyPolicyDocument = (policyDocument: PolicyDocument): boolean => {
  if (!policyDocument) {
    console.error('PolicyDocument is required');
    return false;
  }

  if (!isObject(policyDocument)) {
    console.error('PolicyDocument must be an object');
    return false;
  }

  const { Version, Statement } = policyDocument;
  if (!['2012-10-17', '2008-10-17'].includes(Version)) {
    console.error('Version must be either 2012-10-17 or 2008-10-17');
    return false;
  }

  if (!isArrayOfType<object>(Statement, isObject)) {
    console.error('Statement must be an array of objects');
    return false;
  }

  return true;
};
