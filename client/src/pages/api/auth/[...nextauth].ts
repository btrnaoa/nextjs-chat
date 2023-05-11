import SequelizeAdapter from '@next-auth/sequelize-adapter';
import NextAuth from 'next-auth';
import { Sequelize } from 'sequelize';
import GitHubProvider from 'next-auth/providers/github';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'app',
  password: 'app',
  database: 'app',
});

sequelize.sync();

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  adapter: SequelizeAdapter(sequelize),
});
