import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'app',
  password: 'app',
  database: 'app',
});
