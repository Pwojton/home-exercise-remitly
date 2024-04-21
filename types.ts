export interface Statement {
  Sid?: string;
  Effect: string;
  Action: string | string[];
  Resource: string | string[];
}

export interface PolicyDocument {
  Version: string;
  Statement: Statement[];
}

export interface IamRolePolicy {
  PolicyName: string;
  PolicyDocument: PolicyDocument;
}
