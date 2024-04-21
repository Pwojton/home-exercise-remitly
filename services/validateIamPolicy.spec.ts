import { IamRolePolicy } from '../types';
import { validateIamPolicy } from './validateIamPolicy';

describe('validateIAMPolicy', () => {
  it('should return true when proper data is passed', () => {
    const properData: IamRolePolicy = {
      PolicyName: 'root',
      PolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'IamListAccess',
            Effect: 'Allow',
            Action: ['iam:ListRoles', 'iam:ListUsers'],
            Resource: 'something',
          },
        ],
      },
    };
    expect(validateIamPolicy(properData)).toBe(true);
  });

  it('should return false when data with * in Resources is passed', () => {
    const dataWithStarResource: IamRolePolicy = {
      PolicyName: 'root',
      PolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'IamListAccess',
            Effect: 'Allow',
            Action: ['iam:ListRoles', 'iam:ListUsers'],
            Resource: '*',
          },
        ],
      },
    };
    expect(validateIamPolicy(dataWithStarResource)).toBe(false);
  });

  it('should return false when data with wrong policy document is passed', () => {
    const dataWithStarResource: IamRolePolicy = {
      PolicyName: 'root',
      PolicyDocument: {
        Version: '2017-10-17',
        Statement: [
          {
            Sid: 'IamListAccess',
            Effect: 'Allow',
            Action: ['iam:ListRoles', 'iam:ListUsers'],
            Resource: '*',
          },
        ],
      },
    };
    expect(validateIamPolicy(dataWithStarResource)).toBe(false);
  });

  it('should return false when data with wrong statement is passed', () => {
    const dataWithStarResource: IamRolePolicy = {
      PolicyName: 'root',
      PolicyDocument: {
        Version: '2017-10-17',
        Statement: [
          {
            Sid: 'IamListAccess',
            Effect: 'Test',
            Action: ['iam:ListRoles', 'iam:ListUsers'],
            Resource: 'test',
          },
        ],
      },
    };
    expect(validateIamPolicy(dataWithStarResource)).toBe(false);
  });
});
