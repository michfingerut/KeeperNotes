import { DataTypes } from 'sequelize';

import sequelize from '../sequalize.js';

const Groups = sequelize.define(
  'groups',
  {
    groupId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    id: false,
  },
);

export default Groups;
