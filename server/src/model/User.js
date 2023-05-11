import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const User = sequelize.define(
  'user',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    emailVerified: {
      type: DataTypes.DATE,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    underscored: true,
  },
);

export default User;
