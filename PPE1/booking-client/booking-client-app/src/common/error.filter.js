import { errors, DEFAULT_MESSAGE } from './error';

export default input => {
  return errors[input] || DEFAULT_MESSAGE;
};