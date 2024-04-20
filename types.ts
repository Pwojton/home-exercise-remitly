export interface Statement {
  Sid: string;
  Effect: 'Allow' | 'Deny';
  Action: string | string[];
  Resource: string | string[];
}

interface PolicyDocument {
  Version: string;
  Statement: Statement[];
}

export interface IAMRolePolicy {
  PolicyName: string;
  PolicyDocument: PolicyDocument;
}