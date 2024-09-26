import logger from '../logger.js';
import KeeperError from './errClass.js';
import { errorCode, errorNames } from './errCodes.js';

const handlerMissedRoutes = (req, res, next) => {
  logger.error(`[handlerMissedRoutes] no route for ${req.originalUrl}`);

  const code = errorCode.NOT_FOUND;
  const message = `can't find ${req.originalUrl} on this server.`;
  next(new KeeperError(code, message), req, res);
};

const errorHandler = (err, res, addedMessage) => {
  if (err instanceof KeeperError) {
    res.status(err.errorCode);
    res.json({
      name: errorNames.get(err.errorCode),
      message: err.message,
      code: err.errorCode,
    });

    logger.error(`[keeper error handler] ${err.message}`);
  } else {
    // unexpected error
    logger.error(
      `[keeper error handler] unexpected error ${JSON.stringify(err, null, 2)}`,
    );
    res.status(errorCode.INTERNAL_SERVER_ERROR);
    res.json({ error: addedMessage ? addedMessage : 'internal error' });
  }
};

export { errorHandler, handlerMissedRoutes };
