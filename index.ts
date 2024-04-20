import { promises as fsPromises } from 'fs';
import { IAMRolePolicy, PolicyDocument, Statement } from './types';
import { isStringArray } from './utils';

const path = './data.json';

const readIAMPolicyFromJSONFile = async (filePath: string): Promise<IAMRolePolicy> => {
  const data = await fsPromises.readFile(filePath, { encoding: 'utf8' });
  const policy = JSON.parse(data);

  return policy;
};

const verifyStatement = (statement: Statement): statement is Statement => {
  const { Effect, Resource, Action } = statement;

  if (!(Effect === 'Allow' || Effect === 'Deny')) {
    console.error('Effect must be either Allow or Deny');
    return false;
  }

  if (!(typeof Resource === 'string' || isStringArray(Resource))) {
    console.error('Resource must be a string or an array of strings');
    return false;
  }

  if (Resource === '*') {
    console.error('Resource cannot be *');
    return false;
  }

  if (!(typeof Action === 'string' || isStringArray(Action))) {
    console.error('Action must be a string or an array of strings');
    return false;
  }

  return true;
};

const verifyIAMPolicyProperties = (policyName: string, policyDocument: PolicyDocument): boolean => {
  if (typeof policyName !== 'string') {
    console.error('PolicyName must be a string');
    return false;
  }
  if (typeof policyDocument !== 'object') {
    console.error('PolicyDocument must be an object');
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

  if (!policyDocument) {
    console.error('PolicyDocument is required');
    return false;
  }

  return true;
};

export const validateIAMPolicy = async (filePath: string): Promise<boolean> => {
  try {
    const { PolicyName, PolicyDocument } = await readIAMPolicyFromJSONFile(filePath);

    if (!verifyIAMPolicyProperties(PolicyName, PolicyDocument)) return false;

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

validateIAMPolicy(path).then((result) => console.log(result));
