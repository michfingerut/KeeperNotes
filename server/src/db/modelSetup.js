import Users from './models/users.model.js';
import Notes from './models/notes.model.js';
import Groups from './models/groups.model.js';
import Members from './models/members.model.js';

import logger from '../logger.js';

const syncModels = async () => {
  await Users.sync();
  logger.info('Users table has been created successfuly');

  await Notes.sync();
  logger.info('Notes table has been created successfuly');

  await Groups.sync();
  logger.info('Groups table has been created successfuly');

  await Members.sync();
  logger.info('Members table has been created successfuly');
};

const createAssociations = async () => {
  Notes.belongsTo(Users, {
    foreignKey: { name: 'uuid', allowNull: false },
    onDelete: 'CASCADE',
  });

  Users.belongsToMany(Groups, {
    through: Members,
    foreignKey: 'uuid',
    otherKey: 'groupId',
  });

  logger.info('associations has been initialized successfuly');
};

export { createAssociations, syncModels };
