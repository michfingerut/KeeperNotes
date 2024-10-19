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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    id: false,
  },
);

export default Groups;
