import { promises as fsPromises } from 'fs';
import { IamRolePolicy } from './types';
import { validateIamPolicy } from './services/validateIamPolicy';

const readIamPolicyFromJsonFile = async (filePath: string): Promise<IamRolePolicy | false> => {
  try {
    const data = await fsPromises.readFile(filePath, { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file', error);
    return false;
  }
};

const main = async () => {
  const path = './data.json';
  const policy = await readIamPolicyFromJsonFile(path);
  if (!policy) return false;

  return validateIamPolicy(policy);
};

main().then((result) => console.log(result));
