const Sequelize = require('sequelize');
const sequelize = require('../database');

const CommentLike = sequelize.define('comment_likes', {
  users_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  comments_id: {
    type: Sequelize.BIGINT,
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
  comment_likescol: {
    type: Sequelize.STRING(45),
  },
}, {
  timestamps: false,
});

module.exports = CommentLike;
