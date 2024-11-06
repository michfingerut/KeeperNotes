import logger from '../logger.js';
import sequelize from './sequalize.js';
import { createAssociations } from './modelSetup.js';

try {
  await createAssociations();
  await sequelize.sync();
  logger.info('all tables created');

  await sequelize.authenticate();
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
