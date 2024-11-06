import { errorHandler, handlerMissedRoutes } from './errHandler.js';
import { errorCode } from './errCodes.js';
import KeeperError from './errClass.js';

const priorityEnum = ['regular', 'high', 'low'];

export {
  errorHandler,
  handlerMissedRoutes,
  errorCode,
  KeeperError,
  priorityEnum,
};
