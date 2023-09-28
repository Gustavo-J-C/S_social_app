const Sequelize = require('sequelize');
const sequelize = require('../database');

const Comment = sequelize.define('comments', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  post_id: {
    type: Sequelize.BIGINT,
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

module.exports = Comment;
