interface Statement {
  Sid: string;
  Effect: string | string[];
  Action: string | string[];
  Resource: string | string[];
}

interface PolicyDocument {
  Version: string;
  Statement: Statement | Statement[];
}

export interface IAMPolicy {
  PolicyName: string;
  PolicyDocument: PolicyDocument;
}
