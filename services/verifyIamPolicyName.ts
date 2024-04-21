import { isString } from '../utils';

export const verifyIamPolicyName = (policyName: string): boolean => {
  if (!isString(policyName)) {
    console.error('PolicyName must be a string');
    return false;
  }

  if (policyName.length < 1 || policyName.length > 128) {
    console.error('PolicyName must be between 1 and 128 characters long');
    return false;
  }

  /**
   * PolicyName can only contain the following special characters: + = , . @ -
   * Example:
   *  Proper name: root-1.2
   *  Unproper name: root*<root>
   */
  const policyNamePattern = /^[\w+=,.@-]+$/;
  if (!policyNamePattern.test(policyName)) {
    console.error('PolicyName does not match the pattern');
    return false;
  }

  return true;
};
