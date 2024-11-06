import { DataTypes } from 'sequelize';

import sequelize from '../sequalize.js';
import { priorityEnum } from '../../utils/index.js';

const Notes = sequelize.define('notes', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  scheduledTime: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  priority: {
    type: DataTypes.ENUM(...priorityEnum),
    allowNull: false,
    defaultValue: 'regular',
  },
});

export default Notes;
