import { errorNames } from './errCodes.js';
export default class KeeperError extends Error {
  errorCode;
  name;
  constructor(errorCode, message) {
    super(message);
    this.errorCode = errorCode;
    this.name = errorNames.get(errorCode);
  }
}
