import { verifyIamPolicyName } from './verifyIamPolicyName';

describe('verifyIAMPolicyName', () => {
  it('should return true when proper name is passed', () => {
    expect(verifyIamPolicyName('root-1.2')).toBe(true);
  });

  it('should return false when name is between 1 and 128 characters', () => {
    expect(verifyIamPolicyName('')).toBe(false);
    expect(
      verifyIamPolicyName(
        'rootrootroootrootroootrootroootrootroootrootroootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootrooot'
      )
    ).toBe(false);
  });

  it('should return false when name with forbidden special characters is passed', () => {
    expect(verifyIamPolicyName('ro#o$t!@')).toBe(false);
  });
});
