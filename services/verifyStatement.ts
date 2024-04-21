import { Statement } from '../types';
import { isArrayOfType, isString } from '../utils';

export const verifyStatement = (statement: Statement): boolean => {
  const { Sid, Effect, Resource, Action } = statement;

  if (!isString(Sid)) {
    console.error('Sid must be a string');
    return false;
  }

  if (!['Allow', 'Deny'].includes(Effect)) {
    console.error('Effect must be either Allow or Deny');
    return false;
  }

  if (!(isString(Resource) || isArrayOfType<string>(Resource, isString))) {
    console.error('Resource must be a string or an array of strings');
    return false;
  }

  if (Resource === '*') {
    console.error('Resource cannot be *');
    return false;
  }

  if (!(isString(Action) || isArrayOfType<string>(Action, isString))) {
    console.error('Action must be a string or an array of strings');
    return false;
  }

  return true;
};
