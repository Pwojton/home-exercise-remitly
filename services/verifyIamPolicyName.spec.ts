import { verifyIamPolicyName } from './verifyIamPolicyName';

describe('verifyIAMPolicyName', () => {
  it('assert if true is returned when proper name is passed', () => {
    expect(verifyIamPolicyName('root')).toBe(true);
  });

  it('assert if false is returned when name is to long or to short', () => {
    expect(verifyIamPolicyName('')).toBe(false);
    expect(
      verifyIamPolicyName(
        'rootrootroootrootroootrootroootrootroootrootroootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootroootrootrooot'
      )
    ).toBe(false);
  });

  it('assert if false is returned when name with special characters is passed', () => {
    expect(verifyIamPolicyName('ro#o$t!@')).toBe(false);
  });
});
