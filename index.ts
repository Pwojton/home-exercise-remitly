import { promises as fsPromises } from 'fs';
import { IAMRolePolicy, PolicyDocument, Statement } from './types';
import { isArrayOfType, isString, isObject } from './utils';

const readIAMPolicyFromJSONFile = async (filePath: string): Promise<IAMRolePolicy> => {
  const data = await fsPromises.readFile(filePath, { encoding: 'utf8' });
  const policy = JSON.parse(data);

  return policy;
};

export const verifyStatement = (statement: Statement): boolean => {
  const { Sid, Effect, Resource, Action } = statement;

  if (!isString(Sid)) {
    console.error('Sid must be a string');
    return false;
  }

  if (!(Effect === 'Allow' || Effect === 'Deny')) {
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

export const verifyIAMPolicyName = (policyName: string): boolean => {
  if (!isString(policyName)) {
    console.error('PolicyName must be a string');
    return false;
  }

  const policyNamePattern = /^[\w+=,.@-]+$/;
  if (!policyNamePattern.test(policyName)) {
    console.error('PolicyName does not match the pattern');
    return false;
  }
  if (policyName.length < 1 || policyName.length > 128) {
    console.error('PolicyName must be between 1 and 128 characters long');
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
  if (Version !== '2012-10-17' && Version !== '2008-10-17') {
    console.error('Version must be either 2012-10-17 or 2008-10-17');
    return false;
  }

  if (!isArrayOfType<object>(Statement, isObject)) {
    console.error('Statement must be an array of objects');
    return false;
  }

  return true;
};

export const validateIAMPolicy = (policy: IAMRolePolicy): boolean => {
  try {
    const { PolicyName, PolicyDocument } = policy;

    if (!verifyIAMPolicyName(PolicyName)) return false;
    if (!verifyPolicyDocument(PolicyDocument)) return false;

    const { Statement } = PolicyDocument;

    for (const statement of Statement) {
      const statementValidation = verifyStatement(statement);
      if (!statementValidation) return false;
    }

    return true;
  } catch (error) {
    console.error('Error reading file', error);
    return false;
  }
};

const main = async () => {
  const path = './data.json';
  const policy = await readIAMPolicyFromJSONFile(path);
  return validateIAMPolicy(policy);
};

main().then((result) => console.log(result));
