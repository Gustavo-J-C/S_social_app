const Sequelize = require('sequelize');
const sequelize = require('../database');

const Post = sequelize.define('posts', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  users_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  deleted_at: {
    type: Sequelize.DATE,
  },
}, {
  timestamps: false,
});

module.exports = Post;
