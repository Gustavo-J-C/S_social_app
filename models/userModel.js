const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('users', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  email_verified_at: {
    type: Sequelize.DATE,
  },
  deleted_at: {
    type: Sequelize.DATE,
  },
  updated_at: {
    type: Sequelize.DATE,
  },
}, {
  timestamps: false,
});

module.exports = User;
