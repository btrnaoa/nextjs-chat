import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Session = sequelize.define(
  'session',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sessionToken: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    underscored: true,
  },
);

export default Session;
