import { DataTypes } from 'sequelize';

import sequelize from './sequalize.js';

const Notes = sequelize.define('notes', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Notes;
