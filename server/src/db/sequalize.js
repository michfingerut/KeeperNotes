import { Sequelize } from 'sequelize';

const connectionString = process.env.DB_URL;

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
