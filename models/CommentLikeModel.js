const Sequelize = require('sequelize');
const sequelize = require('../database');
const Comment = require('./CommentModel');

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
    defaultValue: new Date(),
    allowNull: true,
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
    allowNull: true,
  },
  deleted_at: {
    type: Sequelize.DATE,
  },
});



module.exports = CommentLike;
