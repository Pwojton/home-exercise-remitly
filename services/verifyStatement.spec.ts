import { Statement } from '../types';
import { verifyStatement } from './verifyStatement';

describe('verifyStatement', () => {
  it('should return true when proper statement is passed', () => {
    const properStatement: Statement = {
      Sid: 'IamListAccess',
      Effect: 'Allow',
      Action: ['iam:ListRoles', 'iam:ListUsers'],
      Resource: 'test',
    };
    expect(verifyStatement(properStatement)).toBe(true);
  });

  it('should return false when staement with Resiurce * is passed', () => {
    const statementWithStar: Statement = {
      Sid: 'IamListAccess',
      Effect: 'Allow',
      Action: ['iam:ListRoles', 'iam:ListUsers'],
      Resource: '*',
    };
    expect(verifyStatement(statementWithStar)).toBe(false);
  });

  it('should return false when Effect is other than Allow or Deny', () => {
    const statementWithWrongEffect: Statement = {
      Sid: 'IamListAccess',
      Effect: 'Test',
      Action: ['iam:ListRoles', 'iam:ListUsers'],
      Resource: 'test',
    };
    expect(verifyStatement(statementWithWrongEffect)).toBe(false);
  });
});
