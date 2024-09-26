import logger from '../logger.js';
import sequelize from './sequalize.js';

try {
  await sequelize.authenticate();
  await sequelize.sync({});
  logger.info('connection to sequelize established successfuly');
} catch (err) {
  logger.error(
    `unable to create tables and establish sequalize connection -> ${JSON.stringify(
      err,
      null,
      2,
    )} `,
  );
}

export default sequelize;
