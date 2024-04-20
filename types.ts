export interface Statement {
  Sid?: string;
  Effect: 'Allow' | 'Deny';
  Action: string | string[];
  Resource: string | string[];
}

export interface PolicyDocument {
  Version: '2012-10-17' | '2008-10-17';
  Statement: Statement[];
}

export interface IAMRolePolicy {
  PolicyName: string;
  PolicyDocument: PolicyDocument;
}
