import { promises as fsPromises } from 'fs';
import { IAMRolePolicy, Statement } from './types';
import { type } from 'os';

const path = './data.json';

const readIAMPolicyFromJSONFile = async (filePath: string): Promise<IAMRolePolicy> => {
  const data = await fsPromises.readFile(filePath, { encoding: 'utf8' });
  const policy = JSON.parse(data);

  return policy;
};

const verifyStatement = (statement: Statement): boolean => {
  const { Effect, Resource } = statement;

  if (!(Effect === 'Allow' || Effect === 'Deny')) return false;
  if (Resource === '*') return false;

  return true;
};

export const validateIAMPolicy = async (filePath: string): Promise<boolean> => {
  try {
    const policy: IAMRolePolicy = await readIAMPolicyFromJSONFile(filePath);
    const { Statement } = policy.PolicyDocument;

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
