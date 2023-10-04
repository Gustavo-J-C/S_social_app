const Sequelize = require('sequelize');
const sequelize = require('../database');
const PostImage = require('./PostImageModel');
const Comment = require('./commentModel');
const PostLike = require('./postLikeModel');

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

Post.hasMany(PostImage, { foreignKey: 'post_id' });
Post.hasMany(Comment, { foreignKey: 'post_id' });
Post.hasMany(PostLike, { foreignKey: 'post_id' });

module.exports = Post;
