import { verifyIamPolicyName } from './verifyIamPolicyName';

describe('verifyIAMPolicyName', () => {
  it('should return true when proper name is passed', () => {
    expect(verifyIamPolicyName('root')).toBe(true);
  });

  it('should returne flase when name is to long or to short', () => {
    expect(verifyIamPolicyName('')).toBe(false);
    expect(
      verifyIamPolicyName(
        'rootrootroootrootroootrootroootrootroootrootroootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootrooot'
      )
    ).toBe(false);
  });

  it('should returne flase when name with special characters is passed', () => {
    expect(verifyIamPolicyName('ro#o$t!@')).toBe(false);
  });
});
