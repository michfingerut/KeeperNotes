import Users from './users.model.js';
import Notes from './notes.model.js';
import logger from '../logger.js';

const syncModels = async () => {
  await Users.sync();
  logger.info('Users table has been created successfuly');

  await Notes.sync();
  logger.info('Notes table has been created successfuly');
};

const createAssociations = async () => {
  await Notes.belongsTo(Users, {
    foreignKey: { name: 'uuid', allowNull: false },
    onDelete: 'CASCADE',
  });
  logger.info('associations has been initialized successfuly');
};

export { createAssociations, syncModels };
