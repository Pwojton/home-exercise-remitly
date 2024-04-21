import { validateIamPolicy } from './validateIamPolicy';

describe('validateIAMPolicy', () => {
  it('should returne true when proper data is passed', () => {
    const properData = {
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

  it('should returne flase when data with * in Resources is passed', () => {
    const dataWithStarResource = {
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

  it('should returne flase when data with wrong policy document version is passed', () => {
    const dataWithStarResource = {
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
});
