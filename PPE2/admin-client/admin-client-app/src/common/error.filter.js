import { errors, DEFAULT_MESSAGE } from './error';

export default input => {
  if(!input) return undefined;
  return errors[input] || DEFAULT_MESSAGE;
};