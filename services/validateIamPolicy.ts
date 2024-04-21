import { verifyIamPolicyName } from './verifyIamPolicyName';
import { IamRolePolicy } from '../types';
import { verifyPolicyDocument } from './verifyPolicyDocument';
import { verifyStatement } from './verifyStatement';

export const validateIamPolicy = (policy: IamRolePolicy): boolean => {
  const { PolicyName, PolicyDocument } = policy;

  if (!PolicyName || !PolicyDocument) {
    console.error('PolicyName and PolicyDocument are required');
    return false;
  }

  if (!verifyIamPolicyName(PolicyName)) return false;
  if (!verifyPolicyDocument(PolicyDocument)) return false;

  const { Statement } = PolicyDocument;

  for (const statement of Statement) {
    const statementValidation = verifyStatement(statement);
    if (!statementValidation) return false;
  }

  return true;
};
