import logger from '../logger.js';
import sequelize from './sequalize.js';
import { createAssociations, syncModels } from './modelSetup.js';

try {
  //TODO: bug in first build
  await sequelize.authenticate();
  logger.info('connection to sequelize established successfuly');
  await createAssociations();
  await syncModels();
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
