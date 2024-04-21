import { promises as fsPromises } from 'fs';
import { IAMRolePolicy as IamRolePolicy, PolicyDocument, Statement } from './types';
import { isArrayOfType, isString, isObject } from './utils';

const main = async () => {
  const path = './data.json';
  const policy = await readIamPolicyFromJsonFile(path);
  if (!policy) return false;
  return validateIamPolicy(policy);
};

main().then((result) => console.log(result));

const readIamPolicyFromJsonFile = async (filePath: string): Promise<IamRolePolicy | false> => {
  try {
    const data = await fsPromises.readFile(filePath, { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file', error);
    return false;
  }
};

export const validateIamPolicy = (policy: IamRolePolicy): boolean => {
  const { PolicyName, PolicyDocument } = policy;

  if (!verifyIamPolicyName(PolicyName)) return false;
  if (!verifyPolicyDocument(PolicyDocument)) return false;

  const { Statement } = PolicyDocument;

  for (const statement of Statement) {
    const statementValidation = verifyStatement(statement);
    if (!statementValidation) return false;
  }

  return true;
};

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

const verifyPolicyDocument = (policyDocument: PolicyDocument): boolean => {
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

export const verifyStatement = (statement: Statement): boolean => {
  const { Sid, Effect, Resource, Action } = statement;

  if (!isString(Sid)) {
    console.error('Sid must be a string');
    return false;
  }

  if (!['Allow', 'Deny'].includes(Effect)) {
    console.error('Effect must be either Allow or Deny');
    return false;
  }

  if (!(isString(Resource) || isArrayOfType<string>(Resource, isString))) {
    console.error('Resource must be a string or an array of strings');
    return false;
  }

  if (Resource === '*') {
    console.error('Resource cannot be *');
    return false;
  }

  if (!(isString(Action) || isArrayOfType<string>(Action, isString))) {
    console.error('Action must be a string or an array of strings');
    return false;
  }

  return true;
};
