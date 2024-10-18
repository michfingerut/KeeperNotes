import sequelize from '../sequalize.js';

const Members = sequelize.define(
  'members',
  {},
  {
    indexes: [
      {
        unique: true,
        fields: ['groupId', 'uuid'],
      },
    ],
  },
);

export default Members;
