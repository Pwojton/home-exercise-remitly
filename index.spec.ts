import { validateIAMPolicy, verifyIAMPolicyName } from './index';

describe('verifyIAMPolicyName', () => {
  it('assert if true is returned when proper name is passed', () => {
    expect(verifyIAMPolicyName('root')).toBe(true);
  });

  it('assert if false is returned when name is to long or to short', () => {
    expect(verifyIAMPolicyName('')).toBe(false);
    expect(
      verifyIAMPolicyName(
        'rootrootroootrootroootrootroootrootroootrootroootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootrooot'
      )
    ).toBe(false);
  });

  it('assert if false is returned when name with special characters is passed', () => {
    expect(verifyIAMPolicyName('ro#o$t!@')).toBe(false);
  });
});

describe('validateIAMPolicy', () => {
  it('assert if true is returned when proper data is passed', () => {
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
    expect(validateIAMPolicy(properData)).toBe(true);
  });

  it('assert if false is returned when data with * in Resources is passed', () => {
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
    expect(validateIAMPolicy(dataWithStarResource)).toBe(false);
  });

  it('assert if false is returned when data with wrong policy document version is passed', () => {
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
    expect(validateIAMPolicy(dataWithStarResource)).toBe(false);
  });
});

export {};
