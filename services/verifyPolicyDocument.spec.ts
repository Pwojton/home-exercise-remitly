import { PolicyDocument } from '../types';
import { verifyPolicyDocument } from './verifyPolicyDocument';

describe('verifyIAMPolicyDocument', () => {
  it('should return true when proper policy document is passed', () => {
    const properPolicyDocument: PolicyDocument = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'IamListAccess',
          Effect: 'Allow',
          Action: ['iam:ListRoles', 'iam:ListUsers'],
          Resource: '*',
        },
        {
          Sid: 'IamListAccess',
          Effect: 'Allow',
          Action: ['iam:ListRoles', 'iam:ListUsers'],
          Resource: '*',
        },
      ],
    };
    const policyDocumentWithStar: PolicyDocument = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'IamListAccess',
          Effect: 'Allow',
          Action: ['iam:ListRoles', 'iam:ListUsers'],
          Resource: '*',
        },
      ],
    };
    expect(verifyPolicyDocument(properPolicyDocument)).toBe(true);
    expect(verifyPolicyDocument(policyDocumentWithStar)).toBe(true);
  });

  it('should return false when policy with wrong version is passed', () => {
    const wrongVersionPolicyDocument: PolicyDocument = {
      Version: '2024-10-17',
      Statement: [
        {
          Sid: 'IamListAccess',
          Effect: 'Allow',
          Action: ['iam:ListRoles', 'iam:ListUsers'],
          Resource: '*',
        },
      ],
    };
    expect(verifyPolicyDocument(wrongVersionPolicyDocument)).toBe(false);
  });
});
