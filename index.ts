import { promises as fsPromises } from 'fs';
import { IAMPolicy } from './types';

const path = './data.json';

const readIAMPolicyFromJSONFile = async (filePath: string): Promise<IAMPolicy> => {
  const data = await fsPromises.readFile(filePath, { encoding: 'utf8' });
  const policy = JSON.parse(data);

  return policy;
};

export const validateIAMPolicy = async (filePath: string): Promise<boolean> => {
  try {
    const policy: IAMPolicy = await readIAMPolicyFromJSONFile(filePath);
    policy.PolicyDocument;

    return true;
  } catch (error) {
    console.error('Error reading file', error);
    return false;
  }
};

validateIAMPolicy(path).then((result) => console.log(result));
