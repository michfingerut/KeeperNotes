import { DataTypes } from 'sequelize';

import sequelize from './sequalize.js';

const Users = sequelize.define(
  'users',
  {
    uuid: {
      //TODO for some reason doesnt create it
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    //TODO consider indexing email and password
    id: false,
  },
);

export default Users;
