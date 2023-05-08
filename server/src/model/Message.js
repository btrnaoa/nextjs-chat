import cuid from 'cuid';
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Message = sequelize.define('Message', {
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: () => cuid(),
  },
  content: {
    type: DataTypes.TEXT,
  },
});

export default Message;
